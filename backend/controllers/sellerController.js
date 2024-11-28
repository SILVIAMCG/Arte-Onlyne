import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Seller from '../models/sellerModel.js';
import User from '../models/userModel.js';
import SellerBank from '../models/sellerBankModel.js';
import generateToken from '../utils/tokenGenerator.js';



//FUNCION PARA GUARDAR DATOS TEMPORALES DEL VENDEDOR, LLENA UN FORMULARIO CON ESTOS DATOS DESDE LA
//PAGINA DE REGISTRO DE VENDEDOR, DEBE ESTAR LOGEADO COMO USUARIO.
//ESTA FUNCION GUARDA LOS DATOS TEMPORALES EN UNA COOKIE, PORQUE AL COMPLETAR OTRO FORM RECIEN SE GUARDA
//EN LA BASE DE DATOS

const saveSellerDataTemp = asyncHandler(async (req, res) => {
    const { nombre, apellidoPat, apellidoMat, rut, telefono } = req.body;
    try{
        //SE comprueba si el usuario ya es vendedor con su campo esVendedor que esta en el modelo de usuario
        const isRegistered = await User.findById(req.user._id);
        if(isRegistered.esVendedor){
            res.status(400).json({ message: 'El usuario ya es vendedor' });
            return;
        };
        //SE comprueba si el usuario esta registrado
        if(!isRegistered){
            res.status(400).json({ message: 'Usuario no registrado' });
            return;
        }
        const rutExists = await Seller.findOne({ rut });
        if (rutExists) {
            res.status(400).json({ message: 'El RUT ya está registrado' });
            return;
        }
        //SE CREA UN OBJETO CON LOS DATOS TEMPORALES DEL VENDEDOR
        const userDataTemp = {
            usuario : req.user._id,
            nombre,
            apellidoPat,
            apellidoMat,
            rut,
            email: isRegistered.email,
            telefono,
            datosBancarios: []
        } 
        const token = jwt.sign(userDataTemp, process.env.JWT_SECRET);

        //SE GUARDA EL OBJETO EN UNA COOKIE, ESTO SE HACE PARA QUE LOS DATOS TEMPORALES NO SE PIERDAN
        res.cookie('userDataTemp', token, { httpOnly: true, secure: false});
        return res.status(200).json({ message: 'Datos guardados temporalmente', userDataTemp,token});
        
    }catch(error){
        res.status(400).json({ message: "error al registrar temporalmente al usuario",error: error.message });
    
        }
    });


//FUNCION PARA REGISTRAR LOS DATOS BANCARIOS DEL VENDEDOR, SE DEBE HABER REGISTRADO LOS DATOS TEMPORALES

const registerSellerBank = asyncHandler(async (req, res) => {
    const { nombreBanco, numeroCuenta, tipoCuenta, titularCuenta } = req.body;
    try {
        //SE COMPRUEBA SI EL USUARIO HA COMPLETADO LOS DATOS TEMPORALES
        const token = req.cookies.userDataTemp;
        if (!token){
        return res.status(400).json({ message: 'Usuario no ha completado su info' });
        }
        //SE VERIFICA EL TOKEN
        const tempSellerData = jwt.verify(token, process.env.JWT_SECRET);        
        if (!tempSellerData) {
            return res.status(400).json({ message: 'Información temporal no encontrada o inválida' });
        }
        //SE CREA UN OBJETO CON LOS DATOS BANCARIOS DEL VENDEDOR
        const newBankDetails = new SellerBank({
            vendedor: tempSellerData.usuario,
            nombreBanco,
            numeroCuenta,
            tipoCuenta,
            titularCuenta,
            verificado: false
        });

        //SE DEBE IMPLEMENTAR LA LOGICA DE VERIFICACION DE DATOS BANCARIOS, SE HARA MAS ADELANTE
        //YA QUE NO ES PARTE DE ESTA ETAPA DEL PROYECTO

        //Se guardan los datos bancarios
        const bankDetailsSaved = await newBankDetails.save();
        bankDetailsSaved.verificado = true;
        await bankDetailsSaved.save();
        
        //SE CREA UN OBJETO CON LOS DATOS DEL VENDEDOR
        const newSeller = new Seller({
            usuario: tempSellerData.usuario, // Asignar el ID del usuario vendedor
            nombre: tempSellerData.nombre,
            apellidoPat: tempSellerData.apellidoPat,
            apellidoMat: tempSellerData.apellidoMat,
            rut: tempSellerData.rut,
            email: tempSellerData.email,
            telefono: tempSellerData.telefono,
            datosBancarios: bankDetailsSaved._id // Asignar el ID del documento de SellerBank
        });
        //Si esta todo correcto se guardan los datos del vendedor en la coleccion vendedores (sellers) en la base de datos
        //incluyendo los datos temporales y el arreglo con los datos bancarios
        const sellerSaved = await newSeller.save();
        const user = await User.findById(tempSellerData.usuario);
        user.esVendedor = true;
        await user.save();
        
        //SE GENERA EL TOKEN PARA QUE EL VENDEDOR ACCEDA INMEDIATAMENTE A LA OPCION DE VENTA UNA VEZ REGISTRADO
        const sellerToken = await generateToken(user._id, user.esVendedor, user.esAdmin); 
       //SE ELIMINAN LOS DATOS TEMPORALES
        res.clearCookie('userDataTemp');
        //devuelve los datos
        return res.json({
            seller: sellerSaved,
            bankDetails: bankDetailsSaved,
            token: sellerToken
        });
    } catch (error) {
        console.error("Error en registerSellerBank:", error);
        return res.status(500).json({ message: 'Error al registrar los datos bancarios del vendedor', error: error.message });
    }
});


//FUNCION PARA VENDER PRODUCTOS, SE DEBE HABER REGISTRADO LOS DATOS BANCARIOS
const sellProducts = asyncHandler(async (req, res) => {
    try {
        // Verifica si req.user está definido
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Encuentra al usuario basado en el ID
        const user = await User.findById(req.user._id);

        // Verifica si el usuario es un vendedor
        if (!user || !user.esVendedor) {
            return res.status(400).json({ message: 'No autorizado: Usuario no es vendedor' });
        }
        return res.json({ message: 'Acceso concedido' }); // Puedes devolver lo que necesites aquí
    } catch (error) {
        console.error("Error en sellProducts:", error);
        return res.status(500).json({ message: 'Error al vender productos', error: error.message });
    }
});


export { saveSellerDataTemp, registerSellerBank, sellProducts};
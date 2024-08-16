import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Seller from '../models/sellerModel.js';
import User from '../models/userModel.js';
import SellerBank from '../models/sellerBankModel.js';



//ACA SE INTENTO HACER UNA FUNCION PARA REGISTRO Y NO FUNCIONO
// const sellerRegister = asyncHandler(async (req, res) => {
//     const { nombre, apellidoPat, apellidoMat, rut, telefono } = req.body;
//     try{
//         const isRegistered = await User.findById(req.params.id);
//         const isVerified = await SellerBank.findOne(req.params.isVerified);
//         if(isRegistered.esVendedor){
//             res.status(400).json({ message: 'El usuario ya es vendedor' });
//             return;
//         };
//         if(!isRegistered){
//             res.status(400).json({ message: 'Usuario no registrado' });
//             return;
//         }
//         const newSeller = new Seller({
//             usuario: req.user._id,
//             nombre,
//             apellidoPat,
//             apellidoMat,
//             rut,
//             email: isRegistered.email,
//             telefono,
//             datosBancarios: []
//         });
//         if (!isVerified){
//             res.status(400).json({ message: 'Datos bancarios no verificados' });
//             return;
//         }
//         const sellerSaved = await newSeller.save();
//         res.status(201).json(sellerSaved);
//         return res.json(sellerSaved);
        
//     }catch(error){
//         res.status(400).json({ message: error.message });
//     }
// });

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

   
        //esto es nuevo
        const token = jwt.sign(userDataTemp, process.env.JWT_SECRET);
        //fin de lo nuevo

        //SE GUARDA EL OBJETO EN UNA COOKIE, hay que revisar esto porque al parecer la cookie no se envia desde el cliente
        //Al probar en postman si se guarda la cookie, pero desde el form no se guarda
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

        //INTENTOS QUE NO FUNCIONARON
        // const tempSellerData = req.cookies.userDataTemp ? JSON.parse(req.cookies.userDataTemp) : null;
        //const tempSellerData = req.cookies.userDataTemp ? jwt.verify(req.cookies.userDataTemp, process.env.JWT_SECRET) : null;

        //SE VERIFICA SI EL TOKEN DE LOS DATOS TEMPORALES ESTA EN LA COOKIE
        //Como no trae la cookie, hay que revisar esto. Desde postman funciona.
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

        //TOKEN
        //const token = jwt.sign(userDataTemp, process.env.JWT_SECRET);
        //fin de lo nuevo
        //res.cookie('userDataTemp', token, { httpOnly: true });
        //FIN TOKEN
        //Se guardan los datos bancarios
        const bankDetailsSaved = await newBankDetails.save();
        bankDetailsSaved.verificado = true;
        await bankDetailsSaved.save();

        
        //ANTIGUA FORMA DE INGRESAR DATOS
        // const newSeller = new Seller({
        //     ...tempSellerData,
        //     datosBancarios: [bankDetailsSaved._id]
        // });


        //NUEVA FORMA DE INGRESAR DATOS
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
        
        res.clearCookie('userDataTemp');
        //devuelve los datos
        return res.json({
            seller: sellerSaved,
            bankDetails: bankDetailsSaved
        });
    } catch (error) {
        console.error("Error en registerSellerBank:", error);
        return res.status(500).json({ message: 'Error al registrar los datos bancarios del vendedor', error: error.message });
    }
});

// const sellProducts = asyncHandler(async (req, res) => {
//     try {
//         const seller = await Seller.findOne({ usuario: req.user._id});
//         if (!seller) {
//             return res.status(400).json({ message: 'Vendedor no encontrado' });
//         }
//         console.log('ya puedes vender tus productos');
//         return res.json(seller);
//     } catch (error) {
//         console.error("Error en sellProducts:", error);
//         return res.status(500).json({ message: 'Error al vender productos', error: error.message });
//     }
// });


//NUEVO ENFOQUE CON USUARIO ES VENDEDOR
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

        console.log('Ya puedes vender tus productos');
        return res.json({ message: 'Acceso concedido' }); // Puedes devolver lo que necesites aquí
    } catch (error) {
        console.error("Error en sellProducts:", error);
        return res.status(500).json({ message: 'Error al vender productos', error: error.message });
    }
});


//PARA VERIFICAR SI EL USUARIO ES VENDEDOR

const authorizeSeller = asyncHandler(async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id);
        if(!user && !user.esVendedor){       
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }            
        return res.status(200).json({ message: 'Usuario autorizado' });

    } catch (error) {
        console.error("Error en authorizeSeller:", error);
        return res.status(500).json({ message: 'Error al autorizar usuario vendedor', error: error.message });
    } 
});
    




export { saveSellerDataTemp, registerSellerBank, sellProducts};
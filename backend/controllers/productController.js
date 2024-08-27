import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Seller from '../models/sellerModel.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';
import fs from 'fs-extra';

//ESTE ARCHIVO ES PARA TRAER PRODUCTOS, POR AHORA LOS PRODUCTOS FUERON INGRESADOS COMO MUESTRA
//MAS ADELANTE SE IMPLEMENTARA LO NECESARIO PARA QUE LOS USUARIOS PUEDAN INGRESAR PRODUCTOS

//creo una ruta para los productos
//ruta: GET /api/products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

//creo una ruta para un producto en particular, si el id coincide, se muestra
//ruta: GET /api/products/:id
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
       return res.json(product);
    }else{
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});






const createProduct = asyncHandler(async (req, res) => {
    //se saco imagen para probar upload image
    const { nombre,categoria, descripcion, precio, stock, cantidad, creador, contacto} = req.body;
    try{
        const sellerExists = await Seller.findOne({usuario : req.user._id});
        if (!sellerExists) {
            res.status(400).json({ message: 'El vendedor no existe' });
            return;
        }
        const productExists = await Product.findOne({ nombre });
        if (productExists) {
            res.status(400).json({ message: 'El producto ya existe' });
            return;
        }
        const product = new Product({
            // vendedor: req.user._id,
            usuario: sellerExists._id,
            nombre,
            // imagen,
            categoria,
            descripcion,
            precio,
            stock,
            cantidad,
            creador,
            contacto
        });

        if (req.files.imagen) {
            const file = req.files.imagen;
            const result = await uploadImage(file.tempFilePath, req.user._id);
            product.imagen = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(file.tempFilePath);
            }
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el producto', error: error.message });
        }
    
    });


    const deleteProduct = asyncHandler(async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                res.status(404).json({ message: 'Producto no encontrado' });
                return;
            }
            if (product.imagen) {
                await deleteImage(product.imagen.public_id);
            }
            res.json({ message: 'Producto eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
        }
    });

    // const deleteProduct = asyncHandler(async (req, res) => {
    //     try {
    //         const product = await Product.findById(req.params.id); 
    //         if (!product) {
    //             res.status(404).json({ message: 'Producto no encontrado' });
    //             return;
    //         }
    
    //         await product.delete(); 
            
    //         if (product.imagen) {
    //             await deleteImage(product.imagen.public_id);
    //         }
    //         res.json({ message: 'Producto eliminado' });
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    //     }
    // });
    



export {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct
};
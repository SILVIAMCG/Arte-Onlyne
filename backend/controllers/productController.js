import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

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

export {
    getProducts,
    getProductById
};
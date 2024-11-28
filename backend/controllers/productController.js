import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Seller from '../models/sellerModel.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';
import fs from 'fs-extra';

//creo una ruta para los productos, solo los que estan aprobados se muestran
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({status: "aprobado"});
    res.json(products);
});

//creo una ruta para un producto en particular, si el id coincide, se muestra
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
       return res.json(product);
    }else{
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});

//función para obtener productos de un vendedor, para que el vendedor los pueda gestionar
const getProductByUserId = asyncHandler(async(req, res) => {
    try{
        const seller = await Seller.findOne({usuario: req.user._id});
        if(!seller){
            res.status(404).json({ message: 'Vendedor no encontrado' });
            return;
        }
        const products = await Product.find({usuario: seller._id});
        if(!products){
            res.status(404).json({ message: 'No se encontraron productos para este vendedor' });
            return;
        }
        if(products && products.length > 0){
            return res.json(products)
        }
    }catch(error){
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
});

//Crear producto, el vendedor habilitado con esta funcion sube el producto
const createProduct = asyncHandler(async (req, res) => {
    const { nombre,categoria, descripcion, precio, stock} = req.body;
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
            usuario: sellerExists._id,
            nombre,
            categoria,
            descripcion,
            precio,
            stock,
            creador: sellerExists.nombre,
            contacto: sellerExists.telefono
        });

        //Si se sube una imagen, se guarda en cloudinary y se guarda la url y el public_id en la base de datos
        if (req.files.imagen) {
            const file = req.files.imagen;
            const result = await uploadImage(file.tempFilePath, req.user._id);
            product.imagen = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(file.tempFilePath); //Se elimina la imagen del servidor
            }
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    }catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
        }   
    });

    //Elimina el producto, el session es por si cuando el admin elimina un usuario, también se eliminan
    //sus productos. La imagen también se elimina de cloudinary.
    //Esta función se usa en el panel de administración, y también en la gestión de productos del vendedor
    const deleteProduct = asyncHandler(async (req, res) => {
        const productId = req.params.id; // Obtener el ID desde los parámetros de la solicitud
        const session = req.session || null; // Obtener sesión si existe
        //Tiene sesion? si es asi, se elimina el producto con la sesion, si no, se elimina sin sesion
        const product = await Product.findByIdAndDelete(productId, session ? { session } : {});
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' }); 
        }
        if (product.imagen) {
            await deleteImage(product.imagen.public_id);
        }        
        return res.status(200).json({ message: 'Producto eliminado' });
    });

    //Función para que el vendedor actualice el producto
    const updateProduct = asyncHandler(async (req, res) => {
        const { nombre, categoria, descripcion, precio, stock} = req.body;
        try {
            let product = await Product.findById(req.params.id);
            if (!product) {
                res.status(404).json({ message: 'Producto no encontrado' });
                return;
            }
            if (req.files && req.files.imagen) {
                if (product.imagen && product.imagen.public_id) {
                    await deleteImage(product.imagen.public_id);
                }
                const file = req.files.imagen;
                const result = await uploadImage(file.tempFilePath, req.user._id);
                product.imagen = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                };
                await fs.unlink(file.tempFilePath);
            }
            const data = {
                nombre: nombre || product.nombre,
                categoria: categoria || product.categoria,
                descripcion: descripcion || product.descripcion,
                precio: precio || product.precio,
                stock: stock || product.stock,
                imagen: product.imagen
            };
            product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
            res.json(product);            
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
        }
    });

    
export {
    getProducts,
    getProductById,
    getProductByUserId,
    createProduct,
    deleteProduct,
    updateProduct
};
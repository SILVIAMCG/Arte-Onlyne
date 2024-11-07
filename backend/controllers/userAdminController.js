import User from '../models/userModel.js';
import Seller from '../models/sellerModel.js';
import Product from '../models/productModel.js';
import SellerBank from '../models/sellerBankModel.js';
import {deleteProduct} from './productController.js';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

//OBTENER LISTA DE USUARIOS
//ruta: GET /api/users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json({ message: 'Usuario eliminado' });
    }catch(error){
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
});



const deleteUserAndAssociations = asyncHandler(async (req, res) => {    
    let session;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        if (!user.esVendedor) {
            await User.findByIdAndDelete(req.params.id);
            res.json({ message: 'Usuario eliminado' });
            return;
        }

        session = await mongoose.startSession();
        session.startTransaction();
        await User.findByIdAndDelete(req.params.id, { session });

        const seller = await Seller.findOneAndDelete({ usuario: req.params.id }, { session });

        if (seller) {
            await SellerBank.deleteOne({ vendedor: user._id }, { session });
            const products = await Product.find({ usuario: seller._id }, null, { session });

            // Usar deleteProduct para eliminar productos y sus imágenes
            await Promise.all(products.map(product => deleteProduct(product._id, session)));
        }

        await session.commitTransaction();
        res.json({ message: 'Usuario y asociaciones eliminados' });

    } catch (error) {
        if (session) {
            await session.abortTransaction();
        }
        res.status(500).json({ message: 'Error al eliminar usuario y asociaciones', error: error.message });
    } finally {
        if (session) {
            session.endSession();
        }
    }
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


const getPendingProducts = async (req, res) => {
    const products = await Product.find({ status: 'pendiente' });
    res.json(products);
};


const approveProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
    }

    product.status = 'aprobado';
    await product.save();
    res.json({ message: 'Producto aprobado' });
};


const rejectProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
    }

    product.status = 'rechazado';
    await product.save();
    res.json({ message: 'Producto rechazado' });
};



export { getUsers, deleteUser, deleteUserAndAssociations, getProducts, approveProduct, rejectProduct, getPendingProducts };
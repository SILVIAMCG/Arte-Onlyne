import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

const createOrder = asyncHandler(async (req, res) => {
    const {items, nombre_completo, direccion, ciudad, comuna, telefono, costoEnvio, totalPrecio} = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(400).json({ message: 'Usuario no autenticado' });
            return;
        }
        if (items && items.length === 0) {
            res.status(400).json({ message: 'Carrito vacío' });
            return;
        } else {

            for (let item of items) {
                const productExists = await Product.findById(item.idProducto);
                if (!productExists) {
                    return res.status(404).json({ message: `Producto no encontrado: ${item.idProducto}` });
                }
            }
    
            const order = new Order({
                items,
                nombre_completo,
                direccion,
                ciudad,
                comuna,
                telefono,
                costoEnvio,
                totalPrecio,
                usuario: user._id
            });
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }

});

export { createOrder };
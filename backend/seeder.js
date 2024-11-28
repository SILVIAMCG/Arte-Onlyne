//este archivo es para insertar los datos del archivo js a la base de datos 

import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
dotenv.config();
connectDB();

const importData = async () => {
    try {
        //esto es para que no se dupliquen los datos al hacer el ingreso
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        //esto es para insertar los datos de los archivos js a la base de datos
        const createdUsers = await User.insertMany(users);
        //queremos que el admin solamente pueda ingresar productos, es el primero del array
        const admin = createdUsers[0]._id;
        //los productos se traen desde el archivo, se debe recorrer el array y agregar el usuario
        const sampleProducts = products.map(product => {
            return { ...product, usuario: admin }
        });
        //se insertan los productos
        await Product.insertMany(sampleProducts);
        console.log('Importados los productos');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        //esto es para eliminar los datos de la base de datos
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Eliminados los productos');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

//este archivo va como script en el package.json del root porque se ejecuta desde la consola

if(process.argv[2] === '-d'){
    destroyData();
}else {
    importData();
};
import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;

//inicializo express
const app = express();

//creo una ruta
app.get('/', (req, res) => {
  res.send('Corriendo');
});

//creo una ruta para los productos
app.get('/api/products', (req, res) => {
    res.json(products);
});

//creo una ruta para un producto en particular, si el id coincide, se muestra
app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

//escucho en el puerto 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import productRoutes from './routes/productRoutes.js';
import  {notFound, errorHandler} from './middleware/errorMw.js';

//conecto la base de datos
connectDB();
//inicializo express
const app = express();

//creo una ruta
app.get('/', (req, res) => {
  res.send('Corriendo');
});

//las rutas vienen de productRoutes
app.use('/api/products', productRoutes);

//middleware para errores
app.use(notFound);
app.use(errorHandler);

// app.get('/api/products', (req, res) => {
//     res.json(products);
// });


// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.json(product);
// });

//escucho en el puerto 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

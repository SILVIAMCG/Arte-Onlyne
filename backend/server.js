import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

import  {notFound, errorHandler} from './middleware/errorMw.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//DESDE ACA SE EJECUTA EL SERVIDOR, ESTA CONFIGURADO ASI EN EL PACKAGE.JSON

//conecto la base de datos
connectDB();
//inicializo express
const app = express();

//PRUEBA DE CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
}));
//FIN DE PRUEBA

//middleware para aceptar json
app.use(express.json());

app.use(cookieParser());


//creo una ruta
app.get('/', (req, res) => {
  res.send('Corriendo');
});

//las rutas vienen de productRoutes
app.use('/api/products', productRoutes);

//las rutas vienen de authRoutes
app.use('/api/authuser', authRoutes);
app.use('/api/login', authRoutes);
app.use('/api/logout', authRoutes);
app.use('/api/vender', authRoutes);
app.use('/api/banco', authRoutes);

//middleware para errores
app.use(notFound);
app.use(errorHandler);


//escucho en el puerto 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

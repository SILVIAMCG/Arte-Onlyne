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
// import fileUpload from 'express-fileupload';

//DESDE ACA SE EJECUTA EL SERVIDOR, ESTA CONFIGURADO ASI EN EL PACKAGE.JSON

//conecto la base de datos
connectDB();
//inicializo express
const app = express();

app.use(cookieParser());

//PRUEBA DE CORS
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: ['Authorization', 'Content-Type'],
// }));


//PRUEBA PARA CORS CON OPCIONES DE RUTAS CON CREDENCIALES
// Configura CORS globalmente sin credentials
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: ['Authorization', 'Content-Type'],
// }));

// Middleware para rutas que no necesitan credenciales
// app.use('/api/authuser', (req, res, next) => {
//   if (req.path === '/' || req.path ==='/api/logout'){

app.use('/api', (req, res, next) => {
  if (req.path === '/' || req.path === '/api/authuser' || req.path ==='/api/authuser/logout'){
    
    cors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Authorization', 'Content-Type'],
    })(req, res, next);
  } else {
    
    cors({
      origin: 'http://localhost:3000',
     credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     allowedHeaders: ['Authorization', 'Content-Type'],
    })(req, res, next);
  }
});

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));



// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });
//FIN DE PRUEBA

//middleware para aceptar json
app.use(express.json());

//middleware para aceptar archivos, se movio a la ruta de productos
// app.use(fileUpload({
//   useTempFiles : true,
//   tempFileDir : './uploads'
// }));





//creo una ruta
app.get('/', (req, res) => {
  res.send('Corriendo');
});

//las rutas vienen de productRoutes
app.use('/api/products', productRoutes);
//PRUEBA PARA MIS PRODUCTOS DESDE PRODUCT ROUTES
app.use('/api/misproductos', productRoutes);

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

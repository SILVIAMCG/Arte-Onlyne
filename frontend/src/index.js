import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
}from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/custom.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import ProductView from './components/ProductView';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import RegisterSeller from './components/RegisterSeller';
import RegisterBank from './components/RegisterBank.js';
import ProtectedRoute from './utils/ProtectedRoute.js';



const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<App />} >
      {/* index = true es para indicar la ruta principal */}
      <Route index = {true}path ="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/vender" element={<RegisterSeller />} />
        <Route path="/banco" element={<RegisterBank />} />
      </Route>

    </Route>
  )  
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}></RouterProvider>
  </React.StrictMode>
);


reportWebVitals();

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



const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<App />} >
      {/* index = true es para indicar la ruta principal */}
      <Route index = {true}path ="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/carrito" element={<Cart />} />
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

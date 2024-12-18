import React, { createContext, useReducer } from 'react';
import CartReducer from '../reducer/CartReducer';


export const cartContext = createContext();

//Se eligió reducer ya que el usuario depende de la acción que ejecute se modifica el estado del carrito
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, { cart:  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []});
   
    const cantidadDeProductos = () =>
        state.cart.reduce((acc, item) => acc + item.selectedQty, 0);
      const subTotal = () =>
        state.cart.reduce((acc, item) => acc + item.selectedQty * item.precio, 0);


    return (
        <cartContext.Provider value={{ state, dispatch, cantidadDeProductos, subTotal }}>
            {children}
        </cartContext.Provider>
    );

};
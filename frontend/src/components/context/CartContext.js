import React, { createContext, useReducer } from 'react';
import CartReducer from '../reducer/CartReducer';


export const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, { cart: [] });

    return (
        <cartContext.Provider value={{ state, dispatch }}>
            {children}
        </cartContext.Provider>
    );

};
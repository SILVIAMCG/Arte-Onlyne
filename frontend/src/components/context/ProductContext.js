import { createContext, useEffect, useState, useContext} from "react";
import { uploadProductRequest } from "../api/products";
import { sellerContext} from "./SellerContext.js";
import {jwtDecode} from 'jwt-decode';


export const IsSellerContext = createContext();
export const sellProductContext = createContext();

//SE VOLVIO A PONER EL IS SELLER COMO PROVIDER, PARA VERIFICAR AL VENDEDOR EN EL FORMULARIO DE SUBIDA DE PRODUCTOS
 export const IsSellerProvider = ({ children }) => {
    const [permitSeller, setPermitSeller] = useState(false);    
    const isSeller = async () => {
        const token = localStorage.getItem('token');
        console.log("Token encontrado en product context:", token);    
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Token decodificado:", decodedToken);
                
                //ES VENDEDOR ESTA EN EL TOKEN, PARA USAR LA VERIFICACION EN OTRAS PARTES DEL CODIGO
                if (decodedToken.esVendedor) {
                    console.log('Puede vender');
                    setPermitSeller(true);
                } else {
                    console.log('No puede vender');
                    setPermitSeller(false);
                }
            } catch (error) {
                console.error("Error en la decodificación del token o en la subida de productos desde context:", error);
                setPermitSeller(false);
                return;
            }
        } else {
            console.warn("No se encontró token, se omite la verificación de vendedor.");
            setPermitSeller(false);
        }
    };

   
    return (
        <IsSellerContext.Provider value={{ permitSeller, setPermitSeller,isSeller}}>
            {children}
        </IsSellerContext.Provider>
    );

 };

export const SellProductProvider = ({ children }) => {

    const {accessSeller} = useContext(sellerContext);
    const [products, setProducts] = useState([]);
    
    //SE SUBE EL PRODUCTO, RECIBE LOS DATOS DEL PRODUCTO DESDE EL FORM
    const uploadProduct = async (productData) => {
        try{    
            const uploadedProduct = await uploadProductRequest(productData);
            setProducts([...products, uploadedProduct]);
            return uploadedProduct;
            
        } catch (error) {
            console.log("Error subiendo producto:", error);
            return null;
        }
    };




    return (
         <sellProductContext.Provider value={{ uploadProduct}}> 
            {children}
        </sellProductContext.Provider>
    );
    
};

import { createContext, useEffect, useState, useContext} from "react";
import { uploadProduct } from "../api/products";
import { sellerContext} from "./SellerContext.js";



export const sellProductContext = createContext();

export const SellProductProvider = ({ children }) => {

    const [permitSeller, setPermitSeller] = useState(false);
    const {accessSeller} = useContext(sellerContext);
    
    const isSeller = async () => {
        const token = localStorage.getItem('token');
        console.log("Token encontrado en product context:", token);
        if (token) {
            try {
                const response = await uploadProduct();
                console.log(response);
                if (response) {
                    console.log('Puede vender');
                    setPermitSeller(true);
                    console.log('PermitSeller desde context', permitSeller);
                }
                if(!response){
                    console.log('No puede vender');
                    setPermitSeller(false);
                    console.log('PermitSeller desde context', permitSeller);
                }
            } catch (error) {
                console.error("Error en la subida de productos desde context:", error);
                setPermitSeller(false);
                return;
            }
        } else {
            console.warn("No token found, skipping seller check.");
            setPermitSeller(false);
        }
    };


    return (
        <sellProductContext.Provider value={{ permitSeller, setPermitSeller, isSeller}}>
            {children}
        </sellProductContext.Provider>
    );
    
};
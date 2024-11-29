import { createContext, useState } from "react";
import { sellerRequest, sellerBankRequest } from "../api/seller";


export const sellerContext = createContext();

export const SellerProvider = ({ children }) => {
    const [sellerInfo, setSellerInfo] = useState(null);
    const [sellerBankInfo, setSellerBankInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [accessSeller, setAccessSeller] = useState(false);

    
    //esta funcion es para hacer la solicitud de la ruta para el formulario de datos del vendedor
    const fetchSellerData = async (sellerData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await sellerRequest(sellerData);             
            if (response && response.userDataTemp) {
                setSellerInfo(response.userDataTemp); //aca se actualiza el estado del vendedor
                setIsCompleted(true);
            } else {
                console.error("Respuesta inesperada de la API", response);
            }            
            return response;
        } catch (error) {
            console.error("Error obteniendo los datos", error);
            setError(error);
        }
    };


    //esta funcion es para hacer la solicitud de la ruta para el formulario de datos bancarios del vendedor
    //una vez que completo sus datos personales en el formulario anterior, si los completa puede pasar a este
    const fetchSellerBankData = async (sellerBankData) =>{
        try {
            if (!isCompleted) {
                console.error("No se ha completado el registro del vendedor");
            }
            const response = await sellerBankRequest(sellerBankData);
            const seller = response.data?.seller || response.seller;
            const bankDetails = response.data?.bankDetails || response.bankDetails;
            //si recibe los datos, y ademas estan completos los datos de seller, se actualiza el estado
            if (seller && bankDetails) {
                setSellerBankInfo(bankDetails);
                setSellerInfo(seller);
                setAccessSeller(true);  //si todo esta completo, se puede vender
            } else {
                console.error("Respuesta inesperada de la API", response);
            }
            return response;
        } catch (error) {
            console.error("Error obteniendo datos bancarios", error);
            setError(error);
        }
    };
    

    return (
        <sellerContext.Provider value={{ sellerInfo, setSellerInfo, error, isCompleted, setIsCompleted, fetchSellerData, sellerBankInfo, setSellerBankInfo,fetchSellerBankData, accessSeller, setAccessSeller}}>
            {children}
        </sellerContext.Provider>
    );
};
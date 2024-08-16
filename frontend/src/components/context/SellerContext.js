import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { sellerRequest, sellerBankRequest } from "../api/seller";


export const sellerContext = createContext();

export const SellerProvider = ({ children }) => {
    const [sellerInfo, setSellerInfo] = useState(null);
    const [sellerBankInfo, setSellerBankInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    //ESTA ES PARA PROBAR EN EL CONTEXT SI PUEDE VENDER
    const [accessSeller, setAccessSeller] = useState(false);

    
    //esta funcion es para hacer la solicitud de la ruta para el formulario de datos del vendedor
    const fetchSellerData = async (sellerData) => {
        console.log("Datos del vendedor", sellerData); //verifica que recibe los datos
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await sellerRequest(sellerData); 
            
            if (response && response.userDataTemp) {
                setSellerInfo(response.userDataTemp); //aca se actualiza el estado del vendedor
                setIsCompleted(true);
                console.log("Datos del vendedor", response.userDataTemp);
            } else {
                console.error("Respuesta inesperada de la API", response);
            }
            
            return response;
        } catch (error) {
            console.error("Error fetching seller data:", error);
            setError(error);
        }
    };


    //esta funcion es para hacer la solicitud de la ruta para el formulario de datos bancarios del vendedor
    //una vez que completo sus datos personales en el formulario anterior, si los completa puede pasar a este
    const fetchSellerBankData = async (sellerBankData) =>{
        console.log("Datos del banco", sellerBankData);
        try {
            if (!isCompleted) {
                console.error("No se ha completado el registro del vendedor");
            }
            const response = await sellerBankRequest(sellerBankData);
            console.log("respuesta del servidor para datos bancarios", response); //sellerBankRequest viene de api/seller.js
            //aca hay dos opciones de respuesta, por si una no funciona
            const seller = response.data?.seller || response.seller;
            const bankDetails = response.data?.bankDetails || response.bankDetails;
            //si recibe los datos, y ademas estan completos los datos de seller, se actualiza el estado
            if (seller && bankDetails) {
                setSellerBankInfo(bankDetails);
                setSellerInfo(seller);
                console.log("Datos del banco desde context", bankDetails);
                console.log("Datos del vendedor actualizados desde context", seller);
                setAccessSeller(true);  //si todo esta completo, se puede vender
            } else {
                console.error("Respuesta inesperada de la API", response);
            }
            return response;
        } catch (error) {
            console.error("Error fetching seller bank data:", error);
            setError(error);
        }
    };
    

    return (
        //ESTE CONTEXT VA A INDEX.JS
        <sellerContext.Provider value={{ sellerInfo, setSellerInfo, error, isCompleted, setIsCompleted, fetchSellerData, sellerBankInfo, setSellerBankInfo,fetchSellerBankData, accessSeller, setAccessSeller}}>
            {children}
        </sellerContext.Provider>
    );
};
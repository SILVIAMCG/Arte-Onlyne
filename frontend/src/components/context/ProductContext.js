import { createContext, useState} from "react";
import { uploadProductRequest, getProductDetail, getProductFromSeller, updateProductRequest, deleteProductRequest} from "../api/products";
import {jwtDecode} from 'jwt-decode';


export const IsSellerContext = createContext();
export const sellProductContext = createContext();
export const getProductDetailContext = createContext();
export const getProductFromSellerContext = createContext();

//ESTO ES PARA VERIFICAR AL VENDEDOR EN EL FORMULARIO DE SUBIDA DE PRODUCTOS
 export const IsSellerProvider = ({ children }) => {
    const [permitSeller, setPermitSeller] = useState(false);    
    const isSeller = async () => {
        const token = localStorage.getItem('token'); 
        if (token) {
            try {
                const decodedToken = jwtDecode(token);                
                //ES VENDEDOR ESTA EN EL TOKEN, PARA USAR LA VERIFICACION EN OTRAS PARTES DEL CODIGO
                if (decodedToken.esVendedor) {
                    setPermitSeller(true);
                } else {
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


 export const GetProductDetailProvider = ({ children }) => {
    const [productDetail, setProductDetail] = useState(null);
    const getOneProduct = async (id) => { 
        try {
            const product = await getProductDetail(id); 
            setProductDetail(product); 
            return product;
        } catch (error) {
            console.error("Error obteniendo detalle del producto:", error);
            return null;
        }
    };
    return (
        <getProductDetailContext.Provider value={{ getOneProduct, productDetail }}>
            {children}
        </getProductDetailContext.Provider>
    );
 };


 //PRUEBA PARA TRAER PRODUCTOS DE UN SOLO VENDEDOR
 export const GetProductFromSellerProvider = ({ children }) => {
    const [productsFromSeller, setProductsFromSeller] = useState([]);
    const myProducts = async () => {
        try {
            const products = await getProductFromSeller(); 
            setProductsFromSeller(products);
            return products;
        } catch (error) {
            console.error("Error obteniendo productos del vendedor:", error);
            return null;
        }
    };

    const emptyProducts = () => { 
        setProductsFromSeller([]);
     };

     const updateProduct = async (productId, productData) => {
        try {
            const updatedProduct = await updateProductRequest(productId, productData);
            const updatedProducts = productsFromSeller.map((product) => {
                if (product.id === updatedProduct.id) {
                    return updatedProduct;
                }
                return product;
            });
            setProductsFromSeller(updatedProducts);
            return updatedProduct;
        } catch (error) {
            console.error("Error actualizando producto:", error);
            return null;
        }
    };

    //Esto es para mostrar el detalle de los productos 
    const getProductById = async (productId) => {
        try {
            const product = await getProductDetail(productId);
            return product;
        } catch (error) {
            console.error("Error obteniendo producto por ID:", error);
            return null;
        }
    };

    // delete product
    const deleteProduct = async (productId) => {
        try {
            await deleteProductRequest(productId);
            const updatedProducts = productsFromSeller.filter((product) => product._id !== productId);
            setProductsFromSeller(updatedProducts);
        } catch (error) {
            console.error("Error eliminando producto:", error);
        }
    };
 

    return (
        <getProductFromSellerContext.Provider value={{ myProducts, productsFromSeller, emptyProducts,updateProduct, getProductById,deleteProduct }}>
            {children}
        </getProductFromSellerContext.Provider>
    );
 };


export const SellProductProvider = ({ children }) => {
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

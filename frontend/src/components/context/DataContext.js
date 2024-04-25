import { createContext,useEffect,useState } from "react";
import axios from 'axios';
export const dataContext = createContext();

const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    useEffect(() =>{
        const fetchData = async () =>{
            const {data} = await axios.get('/api/products');
            setData(data);
        }
        fetchData();
    },[])
    return (
        <dataContext.Provider value={{data}}>
            {children}
        </dataContext.Provider>
    )

}

export default DataProvider;
import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {userContext} from '../components/context/DataContext.js';



//ESTE ES PARA HACER RUTAS PROTEGIDAS, COMO EL FORMULARIO DE INGRESO DE VENDEDOR
//SI EL USUARIO NO ESTA LOGEADO, LO REDIRECCIONA AL LOGIN
const ProtectedRouteAdmin = ({children}) => {
    const {isAdmin} = useContext(userContext);
        if (!isAdmin) {
            return <Navigate to="/" />;

        }
    return children ? children : <Outlet />;
  };

export default ProtectedRouteAdmin
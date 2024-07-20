import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {userContext} from '../components/context/DataContext.js';

//ESTE ES PARA HACER RUTAS PROTEGIDAS, COMO EL FORMULARIO DE INGRESO DE VENDEDOR
//SI EL USUARIO NO ESTA LOGEADO, LO REDIRECCIONA AL LOGIN
const ProtectedRoute = ({children}) => {
  const {isAuthenticated} = useContext(userContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
}

return children ? children : <Outlet />;
};

export default ProtectedRoute
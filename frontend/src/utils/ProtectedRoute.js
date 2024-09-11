import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {userContext} from '../components/context/DataContext.js';
import {IsSellerContext} from '../components/context/ProductContext.js';



//ESTE ES PARA HACER RUTAS PROTEGIDAS, COMO EL FORMULARIO DE INGRESO DE VENDEDOR
//SI EL USUARIO NO ESTA LOGEADO, LO REDIRECCIONA AL LOGIN
const ProtectedRoute = ({children}) => {
  const {isAuthenticated} = useContext(userContext);
  const {permitSeller} = useContext(IsSellerContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;

  } 

return children ? children : <Outlet />;

};

export default ProtectedRoute
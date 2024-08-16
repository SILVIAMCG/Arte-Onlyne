import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import {Outlet} from 'react-router-dom';
import {DataProvider, UserProvider } from './components/context/DataContext';
import { SellerProvider } from './components/context/SellerContext';
import {SellProductProvider} from './components/context/ProductContext';

const App = () => {
  return (<>
  <DataProvider>
    <UserProvider>  
    <SellerProvider>
      <SellProductProvider>
      <Header />
    <main className="py-3">
      <Container>

        {/* el componente Outlet es un componente especial que se utiliza como un marcador de posición para renderizar el contenido de las rutas secundarias. */}
        <Outlet />
       
      </Container>
    </main>
    <Footer />
    </SellProductProvider>    
    </SellerProvider>
    </UserProvider> 
  </DataProvider> 
  </>    
  )
}

export default App
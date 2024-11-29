import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import {Outlet} from 'react-router-dom';
import {DataProvider, UserProvider } from './components/context/DataContext';
import { SellerProvider } from './components/context/SellerContext';
import { CartProvider } from './components/context/CartContext';
import {SellProductProvider, IsSellerProvider, GetProductDetailProvider, GetProductFromSellerProvider} from './components/context/ProductContext';

const App = () => {
  return (<>
    <DataProvider>
        <GetProductDetailProvider>
            <CartProvider>
                <UserProvider>  
                    <SellerProvider>
                        <IsSellerProvider>
                            <GetProductFromSellerProvider>
                                <SellProductProvider>
                                    <Header />
                                    <main className="py-3">
                                    <Container>  
                                        <Outlet />       
                                    </Container>
                                    </main>
                                </SellProductProvider>
                            </GetProductFromSellerProvider>
                        </IsSellerProvider>    
                    </SellerProvider>
                </UserProvider> 
            </CartProvider>
        </GetProductDetailProvider>
    </DataProvider> 
    <Footer />
    </>    
  )
}

export default App
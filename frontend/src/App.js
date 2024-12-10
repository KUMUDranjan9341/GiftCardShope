import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation ,Navigate} from "react-router-dom";
import { Home } from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Navbar from "./components/Navbar.jsx";
import TopNav from "./components/TopNav";
import MiddleNav from "./components/MiddleNav";
import Footer from "./components/Footer";
import SignUp from './pages/SignUp.jsx';
import Contact from './pages/Contact.jsx';
import Product from './pages/Product.jsx';
import { AuthProvider } from './context/AuthContext';

import { AuthContext } from './context/AuthContext';
import ForgotPass from './pages/ForgotPass.jsx';
import ProductPreview from './pages/ProductPreview.jsx';
import Cart from './pages/Cart.jsx';
import CartAddress from './pages/CartAddress.jsx';

// dashboard
import Dashboard from './pages/Dashboard/AdminDashboard.jsx'
import CategoryManage from './pages/Dashboard/CategoryManage.jsx';
import RegistrationDetails from './pages/Dashboard/RegistrationDetails.jsx';
import ContactDetails from './pages/Dashboard/ContactDetails.jsx';
import ProductManage from './pages/Dashboard/ProductsManage.jsx'






import MyProfile from './pages/MyProfile.jsx'
import MyAddress from './pages/MyAddress.jsx'
import MyOrder from './pages/MyOrder.jsx'
import ItemDetails from './pages/ItemDetails.jsx'



const App = () => {

  const location = useLocation(); 
  console.log('location: ', location);
  const { isLoggedIn } = useContext(AuthContext);


  const isAuthPage = location.pathname === '/login' || location.pathname === '/signUp' || location.pathname === '/forgotpass';
  const isDashboardPage = location.pathname === '/dashboard' || location.pathname === '/managecategory' || location.pathname === '/contactdetails' || location.pathname === '/registrationdetails' || location.pathname=== '/manageproduct';
  return (
    <>
      {!isAuthPage  &&  !isDashboardPage && <TopNav />}
      {!isAuthPage   && !isDashboardPage &&  <MiddleNav />}
       {!isDashboardPage && < Navbar /> } 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/product/:categoryId" element={<Product />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/productpreview/:productId" element={<ProductPreview />} />
        <Route path="/Cart"  element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}  />
        <Route path="/cartaddress" element={<CartAddress />} />

        <Route path="/dashboard"  element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}  />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path='/managecategory' element={<CategoryManage/>}/>
        <Route path='/registrationdetails' element={<RegistrationDetails/>}/>
        <Route path='/contactdetails' element={<ContactDetails/>}/>
        <Route path="/manageproduct" element={<ProductManage/>} />

        <Route path="/myprofile" element={<MyProfile/>} />
        <Route path="/myaddress" element={<MyAddress/>} />
        <Route path="/myorder" element={<MyOrder/>} />
        <Route path="/itemdetails" element={<ItemDetails/>} />

      </Routes>
      {!isAuthPage   &&  !isDashboardPage && <Footer />}
    </>
  );
}

const MainApp = () => (
  <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
);

export default MainApp;

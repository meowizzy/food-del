import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useParams } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { NotFound } from './pages/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import { usePasswordReset } from './hooks/usePasswordReset'
import { Profile } from './pages/Profile/Profile'
import { BookingPage } from './pages/Bookings'

const App = () => {
  const [showLogin,setShowLogin] = useState(false);

  usePasswordReset(() => {
    setShowLogin(true);
  });

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <Navbar setShowLogin={setShowLogin}/>
      <div className='app'>
        <main role="main" className="content">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/passwordReset/:resetPasswordToken' element={<Home/>}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/bookings' element={<BookingPage />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/order' element={<PlaceOrder />}/>
            <Route path='/myorders' element={<MyOrders />}/>
            <Route path='/verify' element={<Verify />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App

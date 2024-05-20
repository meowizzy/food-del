import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { Dashboard } from "./pages/Dashboard";
import { Product } from './pages/Product'
import { Bookings } from "./pages/Bookings";
import { UsersBookings } from "./pages/UsersBookings";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCategories } from "./pages/Categories/services/fetchCategories";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from './pages/Categories'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCategories());
  }, [])

  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/product/:id" element={<Product/>}/>
          <Route path="/bookings" element={<Bookings/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/bookings/:id" element={<UsersBookings/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

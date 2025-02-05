import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import FruitsPage from './components/FruitsPage';
import MilkProductsPage from './components/MilkProductPage';
import VegetablesPage from './components/VegetablesPage';
import GrainsPage from './components/GrainsPage';
import Wishlist from './pages/wishlist';
import Contact from './components/Contact';
import Register from './pages/Register'; // Renamed correctly
import Services from './pages/Services';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import Categories from './pages/categories';

import MyAccount from './pages/MyAccount';
import RequestOTP from './pages/RequestOTP';
import AboutUs from './pages/AboutUs';
import ProductDetail from './pages/ProductDetail';







const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default route for "/" */}
          <Route index element={<Home />} />

          {/* About Page */}
          <Route path="about" element={<AboutUs />} />

          {/* Category Pages */}
          <Route path="fruits" element={<FruitsPage />} />
          <Route path="milk-products" element={<MilkProductsPage />} />
          <Route path="vegetables" element={<VegetablesPage />} />
          <Route path="grains" element={<GrainsPage />} />
          <Route path="Home" element={<Home />} />

          {/* Wishlist Page */}
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="login" element={<Login />} />
          <Route path="services" element={<Services />} />
          <Route path="register" element={<Register />} />
          {/* Contact Page */}
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="FruitpriceList" element={<FruitsPage />} />
          <Route path="MyAccount" element={<MyAccount />} />
          <Route path="RequestOTP" element={<RequestOTP />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="ProductDetail" element={<ProductDetail />} />
          
          

        </Route>

        {/* Register Page */}
       


      </Routes>
    </BrowserRouter>
  );
};

export default App;

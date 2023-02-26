import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProduct from "./components/module/edit-product/EditProduct";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register/Register";
import Category from "./pages/category/Category";
import Checkout from "./pages/checkout/Checkout";
import Custommer from "./pages/custommer/Custommer";
import Detail from "./pages/detail/Detail";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Seller from "./pages/seller/Seller";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="category/:id" element={<Category />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="customer" element={<Custommer />} />
        <Route path="seller" element={<Seller />} />
        <Route path="search" element={<Search />} />
        <Route path="edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

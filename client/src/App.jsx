import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/AdminLayout";
import DashBoard from "./pages/admin-view/dashBoard";
import Products from "./pages/admin-view/products";
import Orders from "./pages/admin-view/orders";
import Features from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/not-found";
const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* <h1>Header Component</h1> */}

      <Routes>
        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashBoard/>} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />}/>
          <Route path="features" element={<Features />}/>
        </Route>
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

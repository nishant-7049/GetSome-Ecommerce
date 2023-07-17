import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import Search from "./components/Search";
import { useDispatch, useSelector } from "react-redux";
import LoginSignUp from "./components/LoginSignUp";
import { loadUser } from "./store/slices/userSlice";
import webFont from "webfontloader";
import UserOptions from "./components/UserOptions";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import NotAuth from "./components/NotAuth";
import UpdatePassword from "./components/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Cart from "./components/Cart";
import Shipping from "./components/Shipping";
import ShippingConfirm from "./components/ShippingConfirm";
import Payment from "./components/Payment";
import Success from "./components/Success";
import MyOrders from "./components/MyOrders";
import MyOrdersDetails from "./components/MyOrdersDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./components/admin/Dashboard";
import AdminProducts from "./components/admin/AdminProducts";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrder from "./components/admin/UpdateOrder";
import AllUsers from "./components/admin/AllUsers";
import UpdateUser from "./components/admin/UpdateUser";
import NotFound from "./components/NotFound.jsx";
import axios from "axios";

function App() {
  const [apiKey, setApiKey] = useState(null);
  const getApiKey = async () => {
    const { data } = await axios.get("/api/payment/apiKey");
    setApiKey(data.stripeApiKey);
  };
  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Nunito", "Roboto", "sans-serif"],
      },
    });
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    getApiKey();
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {isAuthenticated && <UserOptions />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<LoginSignUp />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        {isAuthenticated ? (
          <Route path="/account" element={<Profile />} />
        ) : (
          <Route path="/account" element={<NotAuth />} />
        )}
        {isAuthenticated ? (
          <Route path="/shipping" element={<Shipping />} />
        ) : (
          <Route path="/account" element={<NotAuth />} />
        )}
        {isAuthenticated ? (
          <Route path="/cart" element={<Cart />} />
        ) : (
          <Route path="/cart" element={<NotAuth />} />
        )}
        {isAuthenticated ? (
          <Route path="/success" element={<Success />} />
        ) : (
          <Route path="/success" element={<NotAuth />} />
        )}
        {isAuthenticated ? (
          <Route path="/orders" element={<MyOrders />} />
        ) : (
          <Route path="/orders" element={<NotAuth />} />
        )}
        {isAuthenticated ? (
          <Route path="/order/:id" element={<MyOrdersDetails />} />
        ) : (
          <Route path="/order/:id" element={<NotAuth />} />
        )}
        {isAuthenticated && apiKey !== null ? (
          <Route
            path="/shipping/payment"
            element={
              <Elements stripe={loadStripe(apiKey)}>
                {" "}
                <Payment />{" "}
              </Elements>
            }
          />
        ) : (
          <Route path="/cart" element={<NotAuth />} />
        )}
        {isAuthenticated ? (
          <Route path="/shipping/confirm" element={<ShippingConfirm />} />
        ) : (
          <Route path="/cart" element={<NotAuth />} />
        )}
        {isAuthenticated && (
          <Route path="/me/update" element={<UpdateProfile />} />
        )}
        {isAuthenticated && (
          <Route path="/password/update" element={<UpdatePassword />} />
        )}
        {/* admin routes */}
        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/dashboard" element={<Dashboard />} />
        ) : (
          ""
        )}
        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/products" element={<AdminProducts />} />
        ) : (
          ""
        )}
        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/product/new" element={<NewProduct />} />
        ) : (
          ""
        )}
        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/product/edit/:id" element={<UpdateProduct />} />
        ) : (
          ""
        )}
        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/orders" element={<OrderList />} />
        ) : (
          ""
        )}
        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/order/edit/:id" element={<UpdateOrder />} />
        ) : (
          ""
        )}
        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/users" element={<AllUsers />} />
        ) : (
          ""
        )}
        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/user/edit/:id" element={<UpdateUser />} />
        ) : (
          ""
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

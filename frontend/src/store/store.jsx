import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import ProductDetailsSlice from "./slices/productDetailsSlice";
import userSlice from "./slices/userSlice";
import profileSlice from "./slices/profileSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import myOrdersSlice from "./slices/myOrdersSlice";
import myOrderDetails from "./slices/myOrderDetails";
import NewProduct from "./slices/NewProduct";
import delProduct from "./slices/deleteProductSlice";
import updateProduct from "./slices/updateProduct";
import allOrder from "./slices/allOrderSlice";
import updateOrder from "./slices/updateOrderSlice";
import allUsersSlice from "./slices/allUsersSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    productDetails: ProductDetailsSlice,
    user: userSlice,
    profile: profileSlice,
    cart: cartSlice,
    newOrder: orderSlice,
    myOrders: myOrdersSlice,
    myOrderDetails: myOrderDetails,
    newProduct: NewProduct,
    deleteProduct: delProduct,
    updateProduct: updateProduct,
    allOrders: allOrder,
    updateOrders: updateOrder,
    allUsers: allUsersSlice,
  },
});

export default store;

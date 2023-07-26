import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemToCart = createAsyncThunk("AddToCart", async (object) => {
  const { data } = await axios.get(`/api/product/${object.id}`);
  return {
    product: object.id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0].url,
    stock: data.product.stock,
    quantity: object.quantity,
  };
});
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems:
      localStorage.getItem("cartItems") &&
      localStorage.getItem("cartItems") !== undefined
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingInfo:
      localStorage.getItem("shippingInfo") &&
      localStorage.getItem("shippingInfo") != undefined
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : [],
  },
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      const item = action.payload;
      let isItemExist;
      state.cartItems.map((i) => {
        if (i && i.product === item.product) isItemExist = item;
      });

      if (isItemExist) {
        state.cartItems.map((i) => {
          if (i && i.product === isItemExist.product) {
            i.quantity = isItemExist.quantity;
          }
        });
      } else {
        state.cartItems.push(item);
      }
    });
  },
});

export default cartSlice.reducer;
export const { removeFromCart, saveShippingInfo } = cartSlice.actions;

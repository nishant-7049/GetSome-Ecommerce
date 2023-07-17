import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMyOrders = createAsyncThunk("getMyOrders", async () => {
  const { data } = await axios.get("/api/orders/me");
  return data.orders;
});

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState: {
    loading: false,
    myOrderError: "",
    orders: [],
  },
  reducers: {
    clearError: (state) => {
      state.myOrderError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyOrders.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      }),
      builder.addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.myOrderError = action.error.message;
      });
  },
});

export default myOrdersSlice.reducer;
export const { clearError } = myOrdersSlice.actions;

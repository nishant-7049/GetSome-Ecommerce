import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "createOrder",
  async (orderData) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/order/new", orderData, config);
    return data.order;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    orderError: null,
    order: null,
  },
  reducers: {
    clearError: (state) => {
      state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      }),
      builder.addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderError = action.error.message;
      });
  },
});

export default orderSlice.reducer;
export const { clearError } = orderSlice.actions;

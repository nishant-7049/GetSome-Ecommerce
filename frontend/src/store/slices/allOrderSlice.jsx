import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk("getAllOrders", async () => {
  const { data } = await axios.get("/api/orders");
  return data;
});

const allOrdersSlice = createSlice({
  name: "getAllOrders",
  initialState: {
    loading: false,
    error: null,
    orders: null,
    totalAmount: null,
  },
  reducers: {
    clearError: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount;
      }),
      builder.addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default allOrdersSlice.reducer;
export const { clearError } = allOrdersSlice.actions;

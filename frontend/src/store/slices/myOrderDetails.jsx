import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrderDetails = createAsyncThunk(
  "getOrderDetails",
  async (id) => {
    const { data } = await axios.get(`/api/order/${id}`);
    return data.order;
  }
);

const myOrderDetailsSlice = createSlice({
  name: "myOrderDetails",
  initialState: {
    loading: false,
    error: null,
    order: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      }),
      builder.addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default myOrderDetailsSlice.reducer;
export const { clearError } = myOrderDetailsSlice.actions;

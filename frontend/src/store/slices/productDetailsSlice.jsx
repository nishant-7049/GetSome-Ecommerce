import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk(
  "productDetails/get",
  async (id) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.get(`/api/product/${id}`, config);
    return data.data;
  }
);

export const createReview = createAsyncThunk("newReview", async (rev) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.put("/api/review", rev, config);
  return data.success;
});

const ProductDetailsSlice = createSlice({
  name: "ProductDetails",
  initialState: {
    product: [],
    loading: true,
    error: "",
    reviewed: false,
  },
  reducers: {
    resetReviewed: (state) => {
      state.reviewed = false;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.loading = false;
      state.reviewed = action.payload;
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default ProductDetailsSlice.reducer;
export const { clearError, resetReviewed } = ProductDetailsSlice.actions;

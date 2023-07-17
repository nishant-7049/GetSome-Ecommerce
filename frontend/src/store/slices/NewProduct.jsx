import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "newProduct",
  async (ProductData) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      "/api/product/create",
      ProductData,
      config
    );
    return data.product;
  }
);

const newProductSlice = createSlice({
  name: "newProduct",
  initialState: {
    loading: false,
    error: "",
    product: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    productReset: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default newProductSlice.reducer;
export const { clearError, productReset } = newProductSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProduct = createAsyncThunk("updateProduct", async (Data) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const { data } = await axios.put(
    `/api/product/${Data.id}`,
    Data.productData,
    config
  );
  console.log(data);
  return data;
});

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState: {
    loading: false,
    error: null,
    product: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateProductSlice.reducer;
export const { clearError } = updateProductSlice.actions;

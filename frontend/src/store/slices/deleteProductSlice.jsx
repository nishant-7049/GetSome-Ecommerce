import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk("delProduct", async (id) => {
  const { data } = await axios.delete(`/api/product/${id}`);
  return data;
});

const delProductSlice = createSlice({
  name: "deleteProduct",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    messReset: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default delProductSlice.reducer;
export const { clearError, messReset } = delProductSlice.actions;

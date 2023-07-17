import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateOrder = createAsyncThunk("updateOrder", async (options) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.put(
    `/api/order/${options.id}`,
    options.data,
    config
  );
  return data.success;
});

export const deleteOrder = createAsyncThunk("deleteOrder", async (id) => {
  const { data } = await axios.delete(`/api/order/${id}`);
  return data.success;
});

const updateOrderSlice = createSlice({
  name: "AdminOrderEdit",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
    isDeleted: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateReset: (state) => {
      state.isUpdated = false;
    },
    deleteReset: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      }),
      builder.addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder.addCase(deleteOrder.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      }),
      builder.addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default updateOrderSlice.reducer;
export const { clearError, updateReset, deleteReset } =
  updateOrderSlice.actions;

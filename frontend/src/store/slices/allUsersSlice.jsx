import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  const { data } = await axios.delete(`/api/admin/user/delete/${id}`);
  return data;
});
export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const { data } = await axios.get(`/api/admin/users`);
  return data;
});
export const updateUser = createAsyncThunk("updateUser", async (options) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const { data } = await axios.put(
    `/api/admin/user/update/${options.id}`,
    options.myForm,
    config
  );
  return data;
});
export const getUser = createAsyncThunk("getSingleUser", async (id) => {
  const { data } = await axios.get(`/api/admin/user/${id}`);
  return data;
});

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    loading: false,
    error: null,
    users: null,
    user: null,
    isDeleted: false,
    isUpdated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = false;
    },
    updateReset: (state) => {
      state.isUpdated = false;
    },
    deleteReset: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default allUsersSlice.reducer;
export const { clearError, deleteReset, updateReset } = allUsersSlice.actions;

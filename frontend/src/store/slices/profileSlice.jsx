import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (formData) => {
    const config = { headers: { "Content-Type": "multipart/formdata" } };
    const { data } = await axios.put("/api/update", formData, config);
    return data;
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (passwords) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put("/api/password/update", passwords, config);
    return data;
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (email) => {
    const e = { email };
    const { data } = await axios.post("/api/password/forgot", e);
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (options) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const passwords = {
      newPassword: options.newPassword,
      confirmPassword: options.confirmPassword,
    };
    const { data } = await axios.put(
      `/api/password/reset/${options.token}`,
      passwords,
      config
    );
    return data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: null,
    isSent: null,
  },
  reducers: {
    resetUpdate: (state) => {
      state.isUpdated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetMessage: (state) => [(state.message = null)],
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default profileSlice.reducer;
export const { clearError, resetUpdate } = profileSlice.actions;

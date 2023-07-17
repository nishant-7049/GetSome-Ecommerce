import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "login",
  async (object, { rejectWithValue }) => {
    try {
      const data = await axios.post("/api/login", {
        email: object.loginEmail,
        password: object.loginPassword,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk("register", async (userData) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const { data } = await axios.post("/api/register", userData, config);
  return data;
});

export const loadUser = createAsyncThunk("loaduser", async () => {
  const { data } = await axios.get("/api/me");
  return data;
});

export const logOut = createAsyncThunk("logout", async () => {
  await axios.get("/api/logout");
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = "Invalid Email or Password";
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = "Check Credentials and Email has to be unique.";
    });
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = "LoggedOut Successfully";
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;

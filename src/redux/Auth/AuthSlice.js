import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserAuth from "../../services/UserAuth";
import handleApiError from "../../helpers/handleApiError";
import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UserAuth.post(`/register`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ token, emailAddress }, { rejectWithValue }) => {
    try {
      const response = await UserAuth.get(
        `/verify-email?token=${token}&emailAddress=${emailAddress}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UserAuth.post(`/verify-otp`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (emailAddress, { rejectWithValue }) => {
    try {
      const response = await UserAuth.post(`/resend-otp`, {emailAddress});
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const loginUser = createAsyncThunk( 
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await UserAuth.post(`/login`, payload);
      Cookies.set("userId", data.user._id);
      Cookies.set("token", data.token);
      Cookies.set("role", data.user.isAdmin ? "admin" : "user");
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (emailAddress, { rejectWithValue }) => {
    try {
      const response = await UserAuth.post(`/forgot-password`, {
        emailAddress,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
                                  
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UserAuth.post("reset-password", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const AuthSlice = createSlice({
  name: "authUser",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFullFilled = (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    };
    [
      registerUser,
      verifyEmail,
      verifyOTP,
      loginUser,
      forgotPassword,
      resetPassword,
      resendOTP
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default AuthSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/handleApiError";
import TechnicianService from "../../services/TechnicianService";
import Cookies from "js-cookie";

export const createAccount = createAsyncThunk(
  "createAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const headers = payload instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" };

      const response = await TechnicianService.post(`/create-account`, payload, {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "verifyOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TechnicianService.post(`/verify-otp`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const resendOTP = createAsyncThunk(
  "resendOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TechnicianService.post(`/resend-otp`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TechnicianService.post(`/forget-password`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TechnicianService.post(`/reset-password`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const technicianLogin = createAsyncThunk(
  "technicianLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await TechnicianService.post(`/login`, payload);
      Cookies.set("technicianId", data.technician._id);
      Cookies.set("token", data.token);
      Cookies.set("role", "technician");
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const setTechnicianPassword = createAsyncThunk(
  "setTechnicianPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TechnicianService.post(`/set-password`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const TechnicianAuthSlice = createSlice({
  name: "authTechnician",
  initialState: {
    technician: null,
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
      state.technician = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.technician = null;
      state.error = action.payload;
    };
    [createAccount,verifyOTP,resendOTP,technicianLogin,forgetPassword,resetPassword].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default TechnicianAuthSlice.reducer;

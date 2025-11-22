import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/handleApiError";
import TechnicianService from "../../services/TechnicianService";

export const getAllTechnician = createAsyncThunk(
  "getAllTechnician",
  async (_, { rejectWithValue }) => {
    try {
      const response = await TechnicianService.get(`all-technicians`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getTechnicianById = createAsyncThunk(
  "getTechnicianById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await TechnicianService.get(`technician/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const approveTechnician = createAsyncThunk(
  "approveTechnician",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TechnicianService.post(`/approve-technician`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const TechnicianSlice = createSlice({
  name: "technician",
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
    [getAllTechnician,getTechnicianById,approveTechnician].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default TechnicianSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/handleApiError";
import UserService from "../../services/UserService";

export const getUserById = createAsyncThunk(
  "getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserService.get(`/getUserById/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.get(`/getAllUsers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editUser = createAsyncThunk(
  "editUser",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const headers =
        payload instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" };

      const response = await UserService.put(`/edit-user/${userId}`, payload, {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const UserSlice = createSlice({
  name: "user",
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
    [getUserById, editUser, getAllUsers].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default UserSlice.reducer;

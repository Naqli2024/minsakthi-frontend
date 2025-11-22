import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/handleApiError";
import AdminService from "../../services/AdminService";

export const getAllOrders = createAsyncThunk(
  "getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AdminService.get(`/orders`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllDeletedOrder = createAsyncThunk(
  "getAllDeletedOrder",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await AdminService.delete(`/find-order-deleted/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getOrderByCustomer = createAsyncThunk(
  "getOrderByCustomer",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await AdminService.get(`/orders/customer/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getOrderByOrderId = createAsyncThunk(
  "getOrderByOrderId",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await AdminService.get(`/find-order/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createOrder = createAsyncThunk(
  "createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AdminService.post("/create-order", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const orderRating = createAsyncThunk(
  "orderRating",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AdminService.post("/order-rating", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editOrder = createAsyncThunk(
  "editOrder",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.put(`/orders/${orderId}/updateProcess`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteOrderByOrderId = createAsyncThunk(
  "deleteOrderByOrderId",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await AdminService.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const BookingSlice = createSlice({
  name: "booking",
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
      state.booking = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.booking = null;
      state.error = action.payload;
    };
    [getAllOrders, getOrderByCustomer, createOrder, deleteOrderByOrderId, getOrderByOrderId, orderRating, getAllDeletedOrder ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default BookingSlice.reducer;

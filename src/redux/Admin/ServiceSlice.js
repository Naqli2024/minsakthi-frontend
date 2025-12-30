import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminService from "../../services/AdminService";
import handleApiError from "../../helpers/handleApiError";

export const getAllServices = createAsyncThunk(
  "getAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AdminService.get(`/getAllServices`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createService = createAsyncThunk(
  "createService",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(`/create-service`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const bulkUpload = createAsyncThunk(
  "bulkUpload",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(`/bulk-upload`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteService = createAsyncThunk(
  "deleteService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AdminService.delete(`/delete-service/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllTemplates = createAsyncThunk(
  "getAllTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AdminService.get(`/process-templates?lang=en`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getProcessTemplateById = createAsyncThunk(
  "getProcessTemplateById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AdminService.get(`/process-templates/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createProcessTemplate = createAsyncThunk(
  "createProcessTemplate",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(
        `/create-process-templates`,
        payload
      );
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editProcessTemplates = createAsyncThunk(
  "editProcessTemplates",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AdminService.edit(
        `/process-edit-templates`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteProcessTemplates = createAsyncThunk(
  "deleteProcessTemplates",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AdminService.delete(
        `/process-delete-templates/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const assignTechnician = createAsyncThunk(
  "assignTechnician",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.put(`/orders/${orderId}/assign-technician`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const scheduleVisit = createAsyncThunk(
  "scheduleVisit",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(`/order/${orderId}/schedule-visit`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const generateArrivalOtp = createAsyncThunk(
  "generateArrivalOtp",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(`/order/${orderId}/generate-otp`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyArrivalOtp = createAsyncThunk(
  "verifyArrivalOtp",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(`/order/${orderId}/verify-otp`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const initialObservationReport = createAsyncThunk(
  "initialObservationReport",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(`/order/${orderId}/initial-observation`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const adminReview = createAsyncThunk(
  "adminReview",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(`/order/${orderId}/admin-review`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const bomAcceptance = createAsyncThunk(
  "bomAcceptance",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(`/order/${orderId}/bom-status`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const orderExecution = createAsyncThunk(
  "orderExecution",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.put(`/order/${orderId}/execution`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const generateBOM = createAsyncThunk(
  "generateBOM",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.post(`/order/${orderId}/generateBOM`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editBOM = createAsyncThunk(
  "editBOM",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await AdminService.put(`/order/${orderId}/bom/edit`,payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteBOM = createAsyncThunk(
  "deleteBOM",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await AdminService.delete(`/order/${orderId}/bom/delete`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const ServiceSlice = createSlice({
  name: "service",
  initialState: {
    service: [],
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
      state.service = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.service = null;
      state.error = action.payload;
    };
    [
      getAllServices,
      createService,
      bulkUpload,
      deleteService,
      createProcessTemplate,
      getAllTemplates,
      getProcessTemplateById,
      editProcessTemplates,
      deleteProcessTemplates,
      assignTechnician,
      scheduleVisit,
      generateArrivalOtp,
      verifyArrivalOtp,
      initialObservationReport,
      adminReview,
      bomAcceptance,
      generateBOM,
      editBOM,
      deleteBOM
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default ServiceSlice.reducer;

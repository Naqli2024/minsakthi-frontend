import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../../src/redux/Auth/AuthSlice";
import UserReducer from "../../src/redux/User/UserSlice";
import ServiceReducer from "../../src/redux/Admin/ServiceSlice";
import BookingReducer from "../../src/redux/User/BookingSlice";
import TechnicianAuthReducer from "../../src/redux/Technician/AuthSlice";
import TechnicianReducer from "../../src/redux/Technician/TechnicianSlice";

const rootReducer = combineReducers({
  authUser: AuthReducer,
  user: UserReducer,
  service: ServiceReducer,
  booking: BookingReducer,
  authTechnician: TechnicianAuthReducer,
  technician: TechnicianReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

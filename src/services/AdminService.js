import axios from "axios";
import Cookies from "js-cookie";
import { AdminApiUrl } from "./ApiUrl";

const AdminService = axios.create({
  baseURL: `${AdminApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

AdminService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AdminService;

import axios from "axios";
import Cookies from "js-cookie";
import { TechnicianApiUrl } from "./ApiUrl";

const TechnicianService = axios.create({
  baseURL: `${TechnicianApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

TechnicianService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default TechnicianService;

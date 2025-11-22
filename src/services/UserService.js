import axios from "axios";
import Cookies from "js-cookie";
import { ApiUrl } from "./ApiUrl";

const UserService = axios.create({
  baseURL: `${ApiUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

UserService.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default UserService;

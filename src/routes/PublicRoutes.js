import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserById } from "../redux/User/UserSlice";
import { useEffect, useState } from "react";

const PublicRoutes = ({ children }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

if (token) {
    return role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : role === "user" 
    ? (<Navigate to="/user/dashboard" replace />)
    : (<Navigate to="/technician/dashboard" replace />)
  }

  return children;
};

export default PublicRoutes;

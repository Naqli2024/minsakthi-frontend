import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ children, roleRequired = null }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role"); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && role !== roleRequired) {
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "technician") return <Navigate to="/technician/dashboard" replace />;
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoutes;

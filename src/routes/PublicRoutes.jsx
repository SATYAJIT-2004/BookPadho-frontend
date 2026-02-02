import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoutes = ({ children }) => {
  const { user } = useAuth();

  // If user is logged in, redirect based on role
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user.role === "seller") return <Navigate to="/seller/dashboard" />;
    return <Navigate to="/" />;
  }

  return children;  
};

export default PublicRoutes;

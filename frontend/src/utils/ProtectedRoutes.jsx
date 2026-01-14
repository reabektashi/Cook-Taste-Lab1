import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ requireAdmin = false }) => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const role = user?.user_role;

  if (!user) return <Navigate to="/login" replace />;

  if (requireAdmin && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;

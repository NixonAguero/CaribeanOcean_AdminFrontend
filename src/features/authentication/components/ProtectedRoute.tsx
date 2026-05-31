import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../services/session.service";

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-9 rounded-full border-4 border-zinc-700 border-t-violet-500 animate-spin" />
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}

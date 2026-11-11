
import { Navigate, Outlet, useMatch } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AUTH_PATH = "/auth";
const COMPLETE_PROFILE_PATH = "/auth/complete-profile";

function AuthLayout() {
  const { isAuthenticated, isLoading, isProfileCompleted } = useAuth();

  const isCompleteProfile = useMatch(COMPLETE_PROFILE_PATH);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="size-9 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500"
          role="status"
          aria-label="در حال بررسی وضعیت ورود"
        />
      </div>
    );
  }

  if (!isAuthenticated && isCompleteProfile) {
    return <Navigate to={AUTH_PATH} replace />;
  }

  if (isAuthenticated && isProfileCompleted) {
    return <Navigate to="/" replace />;
  }

  if (isAuthenticated && !isCompleteProfile) {
    return <Navigate to={COMPLETE_PROFILE_PATH} replace />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5">
      <div className="container relative max-w-md overflow-hidden rounded-xl px-10 py-8 md:bg-white/5">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

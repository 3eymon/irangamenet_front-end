import { Navigate } from "react-router-dom";
import { PENDING_OTP_EMAIL_KEY } from "../../services/auth";
import SendOTP from "./send-otp";
export default function AuthPage() {
  const pendingEmail = localStorage.getItem(PENDING_OTP_EMAIL_KEY);

  if (pendingEmail) {
    return (
      <Navigate to="/auth/verify-otp" replace state={{ email: pendingEmail }} />
    );
  }

  return <SendOTP />;
}

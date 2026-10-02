import http from "./httpService";

export const PENDING_OTP_EMAIL_KEY = "ign.pendingOtpEmail";
export const VERIFIED_OTP_EMAIL_KEY = "ign.verifiedOtpEmail";

export function getOTP(data) {
  // return http.post("/user/get-otp", data);
  return {}
}
export function checkOTP(data) {
  // return http.post("/user/check-otp", data);
  return {}
}

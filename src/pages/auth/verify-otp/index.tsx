import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../../components/ui/input";
import {
  verifyOTP,
  PENDING_OTP_EMAIL_KEY,
  VERIFIED_OTP_EMAIL_KEY,
  sendOTP,
} from "../../../services/auth";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { Button } from "../../../components/ui/Button";
import { OTP_LENGTH, verifyOtpSchema } from "../../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAuthApiError } from "@supabase/supabase-js";
import {
  useResendCooldown,
  clearOtpCooldown,
} from "../../../hooks/useResendCooldown";
type VerifyOTPForm = {
  otp: string;
};

function VerifyOTP() {
  const navigate = useNavigate();
  const [email] = useState(() => localStorage.getItem(PENDING_OTP_EMAIL_KEY));
  const { secondsLeft, isActive, start: startCooldown } = useResendCooldown();
  const [resendNotice, setResendNotice] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOTPForm>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onSubmit",
  });
  const resendMutation = useMutation({
    mutationFn: (email: string) => sendOTP(email),
    onSuccess: () => {
      startCooldown();
      clearErrors();
      resetField("otp");
      setResendNotice("کد جدید به ایمیل شما ارسال شد.");
    },
    onError: (error) => {
      setResendNotice("");
      if (isAuthApiError(error) && error.status === 429) {
        startCooldown();
        setError("root", { message: "کمی صبر کنید و دوباره تلاش کنید." });
      } else {
        setError("root", {
          message: "ارسال مجدد انجام نشد. دوباره تلاش کنید.",
        });
      }
    },
  });
  const verifyOTPmutation = useMutation({
    mutationFn: (data: { email: string; otp: string }) => verifyOTP(data),
    onSuccess: () => {
      localStorage.removeItem(PENDING_OTP_EMAIL_KEY);
      clearOtpCooldown();
      navigate("/auth/complete-profile", {
        replace: true,
      });
    },
    onError: (error) => {
      const code = isAuthApiError(error) ? error.code : undefined;
      const status = isAuthApiError(error) ? error.status : undefined;
      if (status === 429 || code === "over_request_rate_limit") {
        setError("root", {
          message: "تلاش‌های ناموفق زیاد بود. کمی بعد دوباره امتحان کنید.",
        });
      } else if (code === "otp_expired") {
        setError("otp", {
          message: "کد منقضی شده یا نامعتبر است. کد جدید دریافت کنید.",
        });
      } else if (status === 400 || status === 401 || status === 403) {
        setError("otp", { message: "کد تایید اشتباه است." });
      } else {
        setError("root", { message: "بررسی کد انجام نشد. دوباره تلاش کنید." });
      }
    },
  });
  const onSubmit = async ({ otp }: VerifyOTPForm) => {
    if (!email) return;
    verifyOTPmutation.mutate({ email, otp });
  };
  const handleResend = () => {
    if (!email || isActive || resendMutation.isPending) return;
    clearErrors();
    resendMutation.mutate(email);
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const changeEmail = () => {
    localStorage.removeItem(PENDING_OTP_EMAIL_KEY);
    navigate("/auth", { replace: true });
  };

  if (!email) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex flex-col gap-6 text-right font-Peyda" dir="rtl">
      <div className="space-y-2">
        <p className="text-sm text-primary-200">مرحله ۲ از ۳</p>
        <h1 className="font-PeydaMed text-xl text-white lg:text-2xl">
          تایید ایمیل
        </h1>
        <p className="text-sm leading-6 text-white/60">
          کد ارسال‌شده به این ایمیل را وارد کنید.
        </p>
        <p className="dir-ltr text-sm text-white/80">{email}</p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm text-white/80" htmlFor="otp">
            کد تایید
          </label>
          <Input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            placeholder="کد ۶ رقمی"
            icon={
              <MdOutlineMarkEmailUnread className="h-5 w-5 text-gray-400 transition-all lg:h-6 lg:w-6" />
            }
            className="!bg-white/5 text-center !text-white placeholder:!text-center placeholder:!text-white/40"
            aria-invalid={!!errors.otp}
            {...register("otp", {
              onChange: (e) => {
                e.target.value = e.target.value
                  .replace(/[۰-۹]/g, (d: string) =>
                    String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)),
                  )
                  .replace(/\D/g, "")
                  .slice(0, OTP_LENGTH);
              },
            })}
          />
          {errors.otp && (
            <p role="alert" className="mt-2 text-sm text-red-400">
              {errors.otp.message}
            </p>
          )}
          {errors.root && (
            <p role="alert" className="mt-2 text-sm text-red-400">
              {errors.root.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={verifyOTPmutation.isPending}
          className="btn--primary justify-center font-Peyda disabled:cursor-wait disabled:opacity-60"
        >
          {verifyOTPmutation.isPending ? "در حال بررسی..." : "تایید کد"}
        </Button>
      </form>
      <div className="flex flex-row items-center gap-2">
        <div className="flex-1 text-center text-sm">
          {isActive ? (
            <p className="text-white/50">
              ارسال مجدد کد تا{" "}
              <span
                className="inline-block w-12 font-mono text-white/80"
                dir="ltr"
              >
                {formatTime(secondsLeft)}
              </span>{" "}
              دیگر
            </p>
          ) : (
            <Button
              type="button"
              variant="outlined"
              onClick={handleResend}
              disabled={resendMutation.isPending}
              className="w-full transition-colors disabled:cursor-wait disabled:opacity-60"
            >
              {resendMutation.isPending ? "در حال ارسال..." : "ارسال مجدد کد"}
            </Button>
          )}
          {resendNotice && (
            <p role="status" className="mt-2 text-xs text-green-400">
              {resendNotice}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          type="button"
          onClick={changeEmail}
          className="text-sm text-primary-200 transition-colors hover:text-primary-100"
        >
          تغییر ایمیل
        </Button>
      </div>
    </div>
  );
}

export default VerifyOTP;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../ui/input";
import {
  checkOTP,
  PENDING_OTP_EMAIL_KEY,
  VERIFIED_OTP_EMAIL_KEY,
} from "../../services/authService";
import { MdMarkEmailUnread, MdOutlineMarkEmailUnread } from "react-icons/md";

type CheckOTPForm = {
  otp: string;
};

function CheckOTP() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const email = localStorage.getItem(PENDING_OTP_EMAIL_KEY);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckOTPForm>();

  const onSubmit = async ({ otp }: CheckOTPForm) => {
    if (!email) return;

    setIsLoading(true);
    setSubmitError("");

    try {
      await checkOTP({ email, otp });
      localStorage.removeItem(PENDING_OTP_EMAIL_KEY);
      localStorage.setItem(VERIFIED_OTP_EMAIL_KEY, email);
      navigate("/auth/complete-profile", { replace: true, state: { email } });
    } catch {
      setSubmitError("کد تایید معتبر نیست یا بررسی آن انجام نشد.");
    } finally {
      setIsLoading(false);
    }
  };

  const changeEmail = () => {
    localStorage.removeItem(PENDING_OTP_EMAIL_KEY);
    navigate("/auth/login", { replace: true });
  };

  if (!email) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex flex-col gap-6 text-right font-Peyda" dir="rtl">
      <div className="space-y-2">
        <p className="text-sm text-primary-200">مرحله ۲ از ۳</p>
        <h1 className="text-xl font-PeydaMed text-white lg:text-2xl">
          تایید ایمیل
        </h1>
        <p className="text-sm leading-6 text-white/60">
          کد ارسال‌شده به این ایمیل را وارد کنید.
        </p>
        <p className="text-sm text-white/80 dir-ltr">{email}</p>
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
            maxLength={6}
            placeholder="کد ۶ رقمی"
            label={
              <MdOutlineMarkEmailUnread className="transition-all h-5 lg:w-6 w-5 lg:h-6 text-gray-400" />
            }
            className="!bg-white/5 !text-white placeholder:!text-white/40 text-center placeholder:!text-center"
            {...register("otp", {
              required: "کد تایید را وارد کنید.",
              pattern: {
                value: /^\d{6}$/,
                message: "کد تایید باید ۶ رقم باشد.",
              },
            })}
          />
          {errors.otp && (
            <p className="mt-2 text-sm text-red-400">{errors.otp.message}</p>
          )}
          {submitError && (
            <p className="mt-2 text-sm text-red-400">{submitError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn--primary justify-center font-Peyda disabled:cursor-wait disabled:opacity-60"
        >
          {isLoading ? "در حال بررسی..." : "تایید کد"}
        </button>
      </form>

      <button
        type="button"
        onClick={changeEmail}
        className="text-sm text-primary-200 transition-colors hover:text-primary-100"
      >
        تغییر ایمیل
      </button>
    </div>
  );
}

export default CheckOTP;

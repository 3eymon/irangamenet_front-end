import { useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";
import Input from "../../ui/input";
import {
  PENDING_OTP_EMAIL_KEY,
  VERIFIED_OTP_EMAIL_KEY,
} from "../../services/authService";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiRename } from "react-icons/bi";
type CompleteProfileForm = {
  displayName: string;
  username: string;
};

type AuthLocationState = {
  email?: string;
};

function CompleteProfile() {
  const location = useLocation();
  const verifiedEmail = localStorage.getItem(VERIFIED_OTP_EMAIL_KEY);
  const pendingEmail = localStorage.getItem(PENDING_OTP_EMAIL_KEY);
  const email =
    verifiedEmail ?? (location.state as AuthLocationState | null)?.email;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteProfileForm>();

  if (!verifiedEmail) {
    return (
      <Navigate to={pendingEmail ? "/auth/check-otp" : "/auth/login"} replace />
    );
  }

  const onSubmit = (data: CompleteProfileForm) => {
    console.log({ email, ...data });
  };

  return (
    <div className="flex flex-col gap-6 text-right font-Peyda" dir="rtl">
      <div className="space-y-2">
        <p className="text-sm text-primary-200">مرحله ۳ از ۳</p>
        <h1 className="text-xl font-PeydaMed text-white lg:text-2xl">
          تکمیل پروفایل
        </h1>
        <p className="text-sm leading-6 text-white/60">
          برای ادامه، اطلاعات پروفایل خود را وارد کنید.
        </p>
        {email && <p className="text-sm text-white/80 dir-ltr">{email}</p>}
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className="mb-2 block text-sm text-white/80"
            htmlFor="displayName"
          >
            نام نمایشی
          </label>
          
          <Input
            id="displayName"
            autoComplete="name"
            placeholder="نامی که دیگران می‌بینند"
            label={
              <MdDriveFileRenameOutline className="transition-all h-5 lg:w-6 w-5 lg:h-6 text-gray-400" />
            }
            className="!bg-white/5 !text-white placeholder:!text-white/40"
            {...register("displayName", {
              required: "نام نمایشی را وارد کنید.",
            })}
          />
          {errors.displayName && (
            <p className="mt-2 text-sm text-red-400">
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="mb-2 block text-sm text-white/80"
            htmlFor="username"
          >
            نام کاربری
          </label>
          <Input
            label={
              <BiRename className="transition-all h-5 lg:w-6 w-5 lg:h-6 text-gray-400" />
            }
            id="username"
            autoComplete="off"
            placeholder="نام کاربری"
            className="!bg-white/5 !text-white placeholder:!text-white/40"
            {...register("username", {
              required: "نام کاربری را وارد کنید.",
              minLength: {
                value: 3,
                message: "نام کاربری باید حداقل ۳ حرف باشد.",
              },
            })}
          />
          {errors.username && (
            <p className="mt-2 text-sm text-red-400">
              {errors.username.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn--primary justify-center font-Peyda"
        >
          ثبت اطلاعات
        </button>
      </form>
    </div>
  );
}

export default CompleteProfile;

import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../../components/ui/input";
import {
  completeProfile,
  PENDING_OTP_EMAIL_KEY,
  VERIFIED_OTP_EMAIL_KEY,
} from "../../../services/auth";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import { Button } from "../../../components/ui/Button";
import { LuDices } from "react-icons/lu";
import { useAuth } from "../../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";

type CompleteProfileForm = {
  displayName: string;
  username: string;
};
const generateUsername = (email = "") => {
  const base =
    email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "")
      .slice(0, 12) || "user";
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}_${suffix}`;
};

const isUsernameTaken = (error: unknown) =>
  (error as { code?: string } | null)?.code === "23505";

function CompleteProfile() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const clearStorage = () => {
    localStorage.removeItem(VERIFIED_OTP_EMAIL_KEY);
    localStorage.removeItem(PENDING_OTP_EMAIL_KEY);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm<CompleteProfileForm>();
  const saveProfile = useMutation({
    mutationFn: completeProfile,
    onSuccess: () => {
      clearStorage();
      navigate("/", { replace: true });
    },
  });

  const fillRandomUsername = () =>
    setValue("username", generateUsername(user?.email), {
      shouldValidate: true,
      shouldDirty: true,
    });
  const onSubmit = async (values: CompleteProfileForm) => {
    clearErrors("root");
    try {
      await saveProfile.mutateAsync(values);
    } catch (error) {
      if (isUsernameTaken(error)) {
        setError("username", {
          message: "این نام کاربری قبلاً گرفته شده است.",
        });
      } else {
        setError("root", {
          message: "ذخیره اطلاعات انجام نشد. دوباره تلاش کنید.",
        });
      }
    }
  };
  const skip = () => {
    clearStorage();
    clearErrors("root");
    navigate("/");
  };
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-9 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className="flex flex-col gap-6 text-right font-Peyda" dir="rtl">
      <div className="space-y-2">
        <p className="text-sm text-primary-200">مرحله ۳ از ۳</p>
        <h1 className="font-PeydaMed text-xl text-white lg:text-2xl">
          تکمیل پروفایل
        </h1>
        <p className="text-sm leading-6 text-white/60">
          برای ادامه، اطلاعات پروفایل خود را وارد کنید.
        </p>
        {user.email && (
          <p className="dir-ltr text-sm text-white/80">{user.email}</p>
        )}
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
            icon={
              <MdDriveFileRenameOutline className="h-5 w-5 text-gray-400 transition-all lg:h-6 lg:w-6" />
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
            htmlFor="ign-username"
          >
            نام کاربری
          </label>
          <Input
            icon={
              <BiRename className="h-5 w-5 text-gray-400 transition-all lg:h-6 lg:w-6" />
            }
            id="ign-username"
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
          <Button
            variant="ghost"
            className="m-1 flex items-center gap-2"
            type="button"
            onClick={fillRandomUsername}
          >
            <LuDices className="h-5 w-5" />
            <span>ساخت نام کاربری</span>
          </Button>
          {errors.username && (
            <p className="mt-2 text-sm text-red-400">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="submit"
            className="flex-1"
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? "در حال ذخیره..." : "ثبت اطلاعات"}
          </Button>
          <Button type="button" onClick={skip} variant="outlined">
            رد کردن
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompleteProfile;

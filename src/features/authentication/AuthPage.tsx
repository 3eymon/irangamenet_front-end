import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Input from "../../ui/input";
import { SiSteam } from "react-icons/si";
import { MdAlternateEmail } from "react-icons/md";
import {
  getOTP,
  PENDING_OTP_EMAIL_KEY,
  VERIFIED_OTP_EMAIL_KEY,
} from "../../services/authService";

const AUTH_PREVIEW_VIDEOS = [
  {
    webm: "/video/trailer/gameplay-1.webm",
    mp4: "/video/trailer/gameplay-1.mp4",
  },
  {
    webm: "/video/trailer/gameplay-2.webm",
    mp4: "/video/trailer/gameplay-2.mp4",
  },
];
const AUTH_PREVIEW_POSTER = "/video/trailer/auth-gameplay-poster-blur.jpg";

type AuthForm = {
  email: string;
};

function AuthPage() {
  const pendingEmail = localStorage.getItem(PENDING_OTP_EMAIL_KEY);

  if (pendingEmail) {
    return (
      <Navigate
        to="/auth/check-otp"
        replace
        state={{ email: pendingEmail }}
      />
    );
  }

  return <AuthPageForm />;
}

function AuthPageForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [previewVideoIndex, setPreviewVideoIndex] = useState(0);
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const activePreviewVideo = AUTH_PREVIEW_VIDEOS[previewVideoIndex];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>();

  const onSubmit = async (data: AuthForm) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      await getOTP({ email: data.email });
      localStorage.removeItem(VERIFIED_OTP_EMAIL_KEY);
      localStorage.setItem(PENDING_OTP_EMAIL_KEY, data.email);
      navigate("/auth/check-otp", { replace: true, state: { email: data.email } });
    } catch {
      setSubmitError("ارسال کد تایید انجام نشد. دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`absolute inset-0 w-full h-full bg-gray-500/5 backdrop-blur-sm z-20 flex flex-col justify-center items-center transition-all ease-linear ${
          isLoading ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="z-30 ml-5">
          <Loading className="mr-2" />
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <div className="space-y-2">
          <div className="group relative mx-auto size-20 overflow-hidden rounded-3xl bg-black">
            <img
              src={AUTH_PREVIEW_POSTER}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full scale-150 object-cover transition-opacity duration-300 motion-reduce:transition-none ${
                isPreviewLoaded ? "opacity-0" : "opacity-100"
              }`}
            />

            <video
              key={activePreviewVideo.mp4}
              className={`absolute inset-0 h-full w-full scale-150 object-cover transition-[opacity,transform] brightness-50 duration-300 ease-out motion-reduce:transition-none ${
                isPreviewLoaded ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              muted
              playsInline
              controls={false}
              preload="metadata"
              aria-hidden="true"
              onLoadedData={() => setIsPreviewLoaded(true)}
              onEnded={() => {
                setIsPreviewLoaded(false);
                setPreviewVideoIndex(
                  (currentIndex) =>
                    (currentIndex + 1) % AUTH_PREVIEW_VIDEOS.length,
                );
              }}
            >
              <source src={activePreviewVideo.webm} type="video/webm" />
              <source src={activePreviewVideo.mp4} type="video/mp4" />
            </video>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"
            />

            <div
              aria-hidden="true"
              className="
      pointer-events-none
      absolute
      left-1/2
      top-1/2
      z-10
      h-[46px]
      w-[62px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-2xl
      border
      border-white/10
      bg-black/25
      shadow-[0_4px_20px_rgba(0,0,0,0.35)]
      backdrop-blur-sm
      transition-all
      duration-300
      motion-reduce:transition-none
    "
            />

            <div
              aria-hidden="true"
              className="
      pointer-events-none
      absolute
      inset-0
      z-20
      flex
      
      select-none
      items-center
      justify-center
      transition-transform
      duration-300
      motion-reduce:transition-none
    "
            >
              <span
                className="
        flex
        items-center
        font-Jaro
        text-3xl
        font-black
        leading-none
        tracking-[-0.08em]
        gap-1
      "
              >
                <span className="text-white drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
                  N
                </span>

                <span
                  className="
          bg-gradient-to-br
          from-primary-300
          via-primary-500
          to-secondary-500
          bg-clip-text
          text-transparent
          drop-shadow-[0_0_10px_rgba(125,119,233,0.8)]
        "
                >
                  G
                </span>

                <span className="text-white drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
                  I
                </span>
              </span>
            </div>

            {!isPreviewLoaded && (
              <div
                aria-hidden="true"
                className="
        pointer-events-none
        absolute
        inset-0
        z-30
        flex
        items-center
        justify-center
      "
              >
                <span className="size-4 animate-pulse rounded-full bg-white/20 backdrop-blur-sm" />
              </div>
            )}
          </div>
          <div className="mb-7 text-center">
            <h2 className="mb-2 select-none text-base font-PeydaMed text-white lg:text-2xl">
              ورود و یا ثبت‌نام در ایران گیم نت
            </h2>

            <p className="mx-auto max-w-sm text-xs leading-6 text-white/45 lg:text-sm">
              برای ادامه، وارد حساب کاربری خود شوید یا یک حساب جدید ایجاد کنید.
            </p>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="group w-full flex items-center justify-center gap-3 font-Peyda text-base lg:text-lg text-white px-5 py-3 rounded-xl bg-gradient-to-b from-[#2a475e] to-[#171a21]"
          >
            <span>ادامه دادن با استیم</span>
            <SiSteam className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        <div className="inline-flex items-center justify-center w-full gap-3">
          <hr className="bg-white text-white w-full" />
          یا
          <hr className="bg-white text-white w-full" />
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full dir-ltr">
            <Input
              className="font-mono placeholder:font-Peyda"
              placeholder="ایمیل (پست الکترونیک)"
              label={
                <MdAlternateEmail className="transition-all h-5 lg:w-6 w-5 lg:h-6 text-gray-400" />
              }
              {...register("email", {
                required: "وارد کردن ایمیل ضروری است.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "لطفا از یک ایمیل معتبر استفاده کنید",
                },
              })}
            />

            {errors.email && (
              <span className="text-red-500 inline-block px-4 pt-2 text-sm lg:text-base w-full text-right dir-rtl">
                {typeof errors.email.message === "string"
                  ? errors.email.message
                  : "لطفا یک ایمیل معتبر وارد کنید"}
              </span>
            )}
            {submitError && (
              <span className="text-red-400 inline-block px-4 pt-2 text-sm lg:text-base w-full text-right dir-rtl">
                {submitError}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn--primary !text-center font-Peyda justify-center"
          >
            ورود به حساب
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;

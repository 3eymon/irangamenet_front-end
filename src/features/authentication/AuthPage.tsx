import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "react-daisyui";
import Input from "../../ui/input";
import { SiSteam } from "react-icons/si";
import { MdAlternateEmail } from "react-icons/md";

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
  const [isLoading, setIsLoading] = useState(false);
  const [previewVideoIndex, setPreviewVideoIndex] = useState(0);
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const activePreviewVideo = AUTH_PREVIEW_VIDEOS[previewVideoIndex];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>();

  const onSubmit = (data: AuthForm) => {
    console.log(data);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${
                isPreviewLoaded ? "opacity-0" : "opacity-100"
              }`}
            />
            <video
              key={activePreviewVideo.mp4}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-105 ${
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
                    (currentIndex + 1) % AUTH_PREVIEW_VIDEOS.length
                );
              }}
            >
              <source src={activePreviewVideo.mp4} type="video/mp4" />
              <source src={activePreviewVideo.webm} type="video/webm" />
            </video>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/10"
            />
          </div>
          <div className="text-center">
            <h2 className="select-none text-center text-base font-bold lg:text-2xl mb-5">
              ورود و یا ثبت نام در ایران گیم نت
            </h2>
            <p></p>
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

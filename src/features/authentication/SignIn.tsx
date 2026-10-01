import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "react-daisyui";
import Input from "../../ui/input";
import { SiPostmates, SiSteam } from "react-icons/si";

type SignInForm = {
  email: string;
};

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit = (data: SignInForm) => {
    console.log(data);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div
        className={`absolute inset-0 w-full h-full bg-gray-500/5 backdrop-blur-sm z-20 flex flex-col justify-center items-center transition-all ease-linear ${isLoading
          ? "opacity-100 visible"
          : "opacity-0 invisible"
          }`}
      >
        <div className="z-30 ml-5">
          <Loading className="mr-2" />
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <div className="space-y-2">
          <div className="bg-white rounded-3xl size-20 flex justify-center items-center mx-auto text-xl font-Jaro text-black">
            IGN
          </div>

          <h2 className="select-none text-center text-base font-bold lg:text-xl mb-5">
            حساب ایران گیم نت
          </h2>
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

        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full dir-ltr">
            <Input
              className="font-mono"
              placeholder="ایمیل (پست الکترونیک)"
              label={
                <SiPostmates className="transition-all h-5 lg:w-6 w-5 lg:h-6 text-gray-400" />
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

export default SignIn;

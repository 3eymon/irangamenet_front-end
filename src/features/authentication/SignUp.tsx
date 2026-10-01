import { PhoneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "react-daisyui";
import Input from "../../ui/input";

type SignUpForm = {
  phoneNumber: string;
};

type SignUpProps = {
  setStep?: (step: number) => void;
  phoneNumber?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SignUp({
  setStep = () => {},
  phoneNumber = "",
  onChange = () => {},
}: SignUpProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignUpForm>();

  const persianToEnglish = (str: string) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return str.replace(
      /[۰-۹]/g,
      (w) => englishDigits[persianDigits.indexOf(w)]
    );
  };

  const onSubmit = (data: SignUpForm) => {
    setIsLoading(true);
    const englishPhoneNumber = persianToEnglish(data.phoneNumber);
    console.log(englishPhoneNumber);
    setTimeout(() => {
      setStep(2);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = persianToEnglish(e.target.value);
    setValue("phoneNumber", value);
    onChange(e);
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

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="select-none text-center text-base font-bold lg:text-xl">
          حساب ایران گیم نت
        </h2>
        <div className="w-full dir-ltr">
          <Input
            placeholder="شماره موبایل"
            mode="numeric"
            label={
              <PhoneIcon className="transition-all h-5 lg:w-6 w-5 lg:h-6 fill-gray-400 text-gray-400" />
            }
            maxLength={phoneNumber.startsWith("0") ? 11 : 10}
            prop={register("phoneNumber", {
              required: "افزودن شماره موبایل ضروری است.",
              pattern: {
                value: /^09\d{9}$/,
                message: "لطفا از یک شماره موبایل معتبر استفاده کنید",
              },
            })}
            name="input"
            setValue={handleChange}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 inline-block px-4 pt-2 text-sm lg:text-base w-full text-right dir-rtl">
              {typeof errors.phoneNumber.message === "string"
                ? errors.phoneNumber.message
                : "لطفا از یک شماره موبایل معتبر استفاده کنید"}
            </span>
          )}
        </div>
        <div className="w-full dir-ltr">
          <Input
            placeholder="شماره موبایل"
            mode="numeric"
            label={
              <PhoneIcon className="transition-all h-5 lg:w-6 w-5 lg:h-6 fill-gray-400 text-gray-400" />
            }
            maxLength={phoneNumber.startsWith("0") ? 11 : 10}
            prop={register("phoneNumber", {
              required: "افزودن شماره موبایل ضروری است.",
              pattern: {
                value: /^09\d{9}$/,
                message: "لطفا از یک شماره موبایل معتبر استفاده کنید",
              },
            })}
            name="input"
            setValue={handleChange}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 inline-block px-4 pt-2 text-sm lg:text-base w-full text-right dir-rtl">
              {typeof errors.phoneNumber.message === "string"
                ? errors.phoneNumber.message
                : "لطفا از یک شماره موبایل معتبر استفاده کنید"}
            </span>
          )}
        </div>
        <button type="submit" className="btn--primary">
          <p className="mx-auto pl-2 font-Peyda">ارسال کد تایید</p>
        </button>
      </form>
    </div>
  );
}

export default SignUp;

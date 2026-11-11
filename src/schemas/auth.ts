import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "وارد کردن ایمیل ضروری است.")
  .max(254, "ایمیل بیش از حد طولانی است.")
  .email("لطفا از یک ایمیل معتبر استفاده کنید.");

export const OTP_LENGTH = 6; 

export const otpSchema = z
  .string()
  .trim()
  .min(1, "کد تایید را وارد کنید.")
  .regex(/^\d+$/, "کد تایید فقط شامل عدد است.")
  .length(OTP_LENGTH, `کد تایید باید ${OTP_LENGTH} رقم باشد.`);

export const displayNameSchema = z
  .string()
  .trim()
  .min(2, "نام نمایشی باید حداقل ۲ حرف باشد.")
  .max(40, "نام نمایشی نباید بیشتر از ۴۰ حرف باشد.")
  .refine((v) => !/[<>]/.test(v), "نام نمایشی شامل کاراکتر غیرمجاز است.");

export const USERNAME_MIN = 5;
export const USERNAME_MAX = 32;

const RESERVED_USERNAMES = [
  "admin",
  "administrator",
  "support",
  "root",
  "moderator",
  "system",
  "api",
  "auth",
  "login",
  "null",
  "undefined",
];

export const usernameSchema = z
  .string()
  .trim()
  .min(1, "نام کاربری را وارد کنید.")
  .min(USERNAME_MIN, `نام کاربری باید حداقل ${USERNAME_MIN} کاراکتر باشد.`)
  .max(USERNAME_MAX, `نام کاربری نباید بیشتر از ${USERNAME_MAX} کاراکتر باشد.`)
  .regex(/^[a-zA-Z]/, "نام کاربری باید با حرف انگلیسی شروع شود.")
  .regex(/^[a-zA-Z0-9_]+$/, "فقط حروف انگلیسی، عدد و آندرلاین (_) مجاز است.")
  .refine((v) => !v.includes("__"), "آندرلاین نباید پشت سر هم بیاید.")
  .refine((v) => !v.endsWith("_"), "نام کاربری نباید با آندرلاین تمام شود.")
  .refine(
    (v) => !RESERVED_USERNAMES.includes(v.toLowerCase()),
    "این نام کاربری مجاز نیست.",
  );

export const sendOtpSchema = z.object({
  email: emailSchema,
});

export const verifyOtpSchema = z.object({
  otp: otpSchema,
});

export const completeProfileSchema = z.object({
  displayName: displayNameSchema,
  username: usernameSchema,
});

export type SendOtpForm = z.infer<typeof sendOtpSchema>;
export type VerifyOtpForm = z.infer<typeof verifyOtpSchema>;
export type CompleteProfileForm = z.infer<typeof completeProfileSchema>;
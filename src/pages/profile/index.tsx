import {
  ArrowPathIcon,
  CameraIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { Button } from "../../components/ui/Button";
import Image from "../../components/ui/Image";
import Input from "../../components/ui/input";
import { useAuth } from "../../contexts/AuthContext";
import { displayNameSchema, usernameSchema } from "../../schemas/auth";
import { removeAvatar, updateProfile } from "../../services/auth";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 1;

const displayNameForm = z.object({
  display_name: displayNameSchema,
  avatar: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].size <= MAX_UPLOAD_SIZE,
      "حجم عکس نباید بیشتر از ۱ مگابایت باشه",
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].type.startsWith("image/"),
      "فقط فایل تصویری مجازه",
    ),
  username: usernameSchema,
});
type DisplayName = z.infer<typeof displayNameForm>;

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-neutral-700/40 ${className}`} />
  );
}

function Profile() {
  const { user, profile, refreshProfile, isLoading } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm<DisplayName>({
    resolver: zodResolver(displayNameForm),
    mode: "onChange",
    defaultValues: { display_name: "" },
  });

  const [isUsernameInputActive, setUsernameActive] = useState(false);
  const [isDisplayNameActive, setDisplayNameActive] = useState(false);

  useEffect(() => {
    if (profile) {
      reset({
        display_name: profile.display_name || "",
        username: profile.username,
      });
    }
  }, [profile, reset]);

  useEffect(() => {
    if (isDisplayNameActive) setFocus("display_name");
  }, [isDisplayNameActive, setFocus]);
  useEffect(() => {
    if (isUsernameInputActive) setFocus("username");
  }, [isUsernameInputActive, setFocus]);

  const avatarFiles = watch("avatar") as FileList | undefined;
  const newAvatarFile = !errors.avatar && avatarFiles?.[0];

  const previewUrl = useMemo(
    () => (newAvatarFile ? URL.createObjectURL(newAvatarFile) : null),
    [newAvatarFile],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const displayName = watch("display_name");
  const userName = watch("username");

  const hasDisplayNameChanged = displayName !== (profile?.display_name || "");
  const hasUserNameChanged = userName !== (profile?.username || "");

  const hasAvatarChanged = Boolean(newAvatarFile);

  const hasChanges =
    hasDisplayNameChanged || hasAvatarChanged || hasUserNameChanged;
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["update"],
    onSuccess: async () => {
      await refreshProfile();
      toast.success("اطلاعات با موفقیت بروزرسانی شدند !");
      setUsernameActive(false);
      setDisplayNameActive(false);
      resetField("avatar");
    },
    onError: (error) => {
      setError("root", { message: error.message || "خطای ناشناخته" });
    },
  });
  const removeAvatarMutation = useMutation({
    mutationFn: removeAvatar,
    mutationKey: ["remove"],
    onSuccess: async () => {
      await refreshProfile();
      resetField("avatar");
      setConfirmOpen(false);
      toast.success("آواتار با موفقیت حذف شد !");
    },
    onError: (error) => {
      setError("root", { message: error.message || "خطای ناشناخته" });
    },
  });
  const onSubmit = (data: DisplayName) => {
    if (!user) return;

    const file = data.avatar?.[0] as File | undefined;

    updateProfileMutation.mutate({
      userId: user.id,
      display_name: data.display_name,
      username: data.username,
      avatar: file,
    });
  };
  const handleRemoveAvatar = () => {
    console.log("im here");
    if (!user || !profile?.avatar_path) return;
    console.log("no im here");
    removeAvatarMutation.mutate(user?.id);
  };
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">پروفایل من</h1>
        <p className="text-sm text-neutral-500">
          اطلاعات شخصی و یا کلی خودتو اینجا میتونی تغییر بدی و ببینی
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold">تغییر اطلاعات شخصی</h2>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="size-24 shrink-0 rounded-full" />
          ) : (
            <div className="relative">
              <Image
                icon
                src={previewUrl ?? profile?.avatar_path}
                alt="تصویر کاربر"
                className="size-24 rounded-full"
              />
              {previewUrl && (
                <Button
                  type="button"
                  onClick={() => resetField("avatar")}
                  icon
                  className="absolute right-0 top-0 bg-red-600/80 p-1 text-red-100 active:bg-red-500/80"
                >
                  <XMarkIcon className="size-4" />
                </Button>
              )}
            </div>
          )}

          <div className="space-y-2">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-44" />
              </div>
            ) : (
              <div>
                <p>{profile?.display_name || profile?.username}</p>
                <p className="text-neutral-400">{user?.email}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <label
                htmlFor="avatar"
                className={cn(
                  "inline-flex h-9 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border px-4 py-2 transition-all active:scale-95",
                  !profile?.avatar_path
                    ? "border-primary/50 bg-primary/10 text-primary hover:bg-primary/20"
                    : "hover:bg-white/5",
                )}
              >
                <CameraIcon className="size-4" />

                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("avatar")}
                />
              </label>

              {profile?.avatar_path && (
                <motion.div
                  layout
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    },
                  }}
                  className="flex h-9 items-center overflow-hidden rounded-full border border-red-500 bg-transparent text-red-500"
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {!confirmOpen ? (
                      <motion.button
                        key="trash"
                        type="button"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setConfirmOpen(true)}
                        className="flex h-9 shrink-0 items-center justify-center px-4 hover:bg-red-500/10"
                      >
                        <TrashIcon className="size-4" />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="confirm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex h-9 shrink-0 items-center gap-3 px-3 text-sm"
                      >
                        <button
                          type="button"
                          disabled={removeAvatarMutation.isPending}
                          onClick={handleRemoveAvatar}
                          className="flex items-center gap-1 whitespace-nowrap transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {removeAvatarMutation.isPending ? (
                            <ArrowPathIcon className="size-4 animate-spin" />
                          ) : (
                            <CheckIcon className="size-4" />
                          )}
                          {removeAvatarMutation.isPending
                            ? "در حال حذف..."
                            : "تأیید"}
                        </button>

                        <span className="h-4 w-px shrink-0 bg-red-500/40" />

                        <button
                          type="button"
                          disabled={removeAvatarMutation.isPending}
                          onClick={() => setConfirmOpen(false)}
                          className="flex items-center gap-1 whitespace-nowrap text-zinc-300 transition-colors hover:text-zinc-100 disabled:opacity-50"
                        >
                          <XMarkIcon className="size-4" />
                          لغو
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {errors.avatar && (
              <p className="text-sm text-red-500">
                {(errors.avatar.message as string) || "خطای ناشناخته"}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="display_name" className="text-lg font-semibold">
            نام نمایشی
          </label>
          {isLoading ? (
            <Skeleton className="h-11 w-full rounded-lg" />
          ) : (
            <div className="relative">
              <Input
                disabled={!isDisplayNameActive}
                id="display_name"
                readOnly={!isDisplayNameActive}
                placeholder=" مانند علی احمدی یا Ali Ahmadi"
                className="px-4"
                {...register("display_name")}
              />
              <Button
                type="button"
                onClick={() => {
                  if (isDisplayNameActive) {
                    reset({ display_name: profile?.display_name || "" });
                  }
                  setDisplayNameActive((prev) => !prev);
                }}
                variant="outlined"
                className="absolute left-3.5 top-2 rounded-full p-2"
                icon
              >
                {isDisplayNameActive ? (
                  <XMarkIcon className="size-4" />
                ) : (
                  <PencilSquareIcon className="size-4" />
                )}
              </Button>
            </div>
          )}
          {errors.display_name && (
            <p className="text-sm text-red-500">
              {(errors.display_name.message as string) || "خطای ناشناخته"}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="display_name" className="text-lg font-semibold">
            نام کابری
          </label>
          {isLoading ? (
            <Skeleton className="h-11 w-full rounded-lg" />
          ) : (
            <div className="relative">
              <Input
                disabled={!isUsernameInputActive}
                id="username"
                readOnly={!isUsernameInputActive}
                placeholder=" مانند علی احمدی یا Ali Ahmadi"
                className="px-4"
                {...register("username")}
              />
              <Button
                type="button"
                onClick={() => {
                  if (isUsernameInputActive) {
                    reset({ username: profile?.username || "" });
                  }
                  setUsernameActive((prev) => !prev);
                }}
                variant="outlined"
                className="absolute left-3.5 top-2 rounded-full p-2"
                icon
              >
                {isUsernameInputActive ? (
                  <XMarkIcon className="size-4" />
                ) : (
                  <PencilSquareIcon className="size-4" />
                )}
              </Button>
            </div>
          )}
          {errors.username && (
            <p className="text-sm text-red-500">
              {(errors.username.message as string) || "خطای ناشناخته"}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={
              isLoading || updateProfileMutation.isPending || !hasChanges
            }
          >
            {updateProfileMutation.isPending
              ? "درحال بروزرسانی ..."
              : "بروزرسانی اطلاعات"}
          </Button>
          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;

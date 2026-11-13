import {
  CameraIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { Button } from "../../components/ui/Button";
import Image from "../../components/ui/Image";
import Input from "../../components/ui/input";
import { useAuth } from "../../contexts/AuthContext";
import { displayNameSchema } from "../../schemas/auth";
import { updateProfile } from "../../services/auth";

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
});
type DisplayName = z.infer<typeof displayNameForm>;

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-neutral-700/40 ${className}`} />
  );
}

function Profile() {
  const { user, profile, refreshProfile, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    watch,
    resetField,
    setError,
    formState: { errors, isDirty },
  } = useForm<DisplayName>({
    resolver: zodResolver(displayNameForm),
    mode: "all",
    defaultValues: { display_name: "" },
  });

  const [activeInput, setActiveInput] = useState(false);

  useEffect(() => {
    if (profile) {
      reset({ display_name: profile.display_name || "" });
    }
  }, [profile, reset]);

  useEffect(() => {
    if (activeInput) setFocus("display_name");
  }, [activeInput, setFocus]);

  const avatarFiles = watch("avatar") as FileList | undefined;
  const newAvatarFile = avatarFiles?.[0];

  const previewUrl = useMemo(
    () => (newAvatarFile ? URL.createObjectURL(newAvatarFile) : null),
    [newAvatarFile],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const hasChanges = isDirty || Boolean(newAvatarFile);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["update"],
    onSuccess: async () => {
      await refreshProfile();
      setActiveInput(false);
      resetField("avatar");
    },
    onError: (error) => {
      console.error(error);
      setError("root", { message: error.message || "خطای ناشناخته" });
    },
  });

  const onSubmit = (data: DisplayName) => {
    if (!user) return;

    const file = data.avatar?.[0] as File | undefined;

    updateProfileMutation.mutate({
      userId: user.id,
      display_name: data.display_name,
      avatar: file,
    });
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
                className="cursor-pointer transition-transform ease-in-out active:scale-95"
              >
                <span className="inline-flex rounded-full border px-4 py-2">
                  <CameraIcon className="size-4" />
                </span>
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("avatar")}
              />
              <Button
                type="button"
                disabled={isLoading || !profile?.avatar_path}
                variant="outlined"
                color="#ef4444"
                className="rounded-full border-red-500 bg-transparent px-4 py-2 text-red-500 hover:border-red-600 hover:bg-red-500/10"
                icon
              >
                <TrashIcon className="size-4" />
              </Button>
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
                id="display_name"
                readOnly={!activeInput}
                placeholder=" مانند علی احمدی یا Ali Ahmadi"
                className="px-4"
                {...register("display_name")}
              />
              <Button
                type="button"
                onClick={() => {
                  if (activeInput) {
                    reset({ display_name: profile?.display_name || "" });
                  }
                  setActiveInput((prev) => !prev);
                }}
                variant="outlined"
                className="absolute left-3.5 top-2 rounded-full p-2"
                icon
              >
                {activeInput ? (
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

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={isLoading || updateProfileMutation.isPending || !hasChanges}
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
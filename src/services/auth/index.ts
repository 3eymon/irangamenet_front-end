import { supabase } from "../../utils/supabase"

export const PENDING_OTP_EMAIL_KEY = "email_pending_otp"
export const VERIFIED_OTP_EMAIL_KEY = "email_verified_otp"


export async function sendOTP(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true },
  });
  if (error) throw error;
}

export async function verifyOTP({ email, otp }: { email: string; otp: string }) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
  if (error) throw error;
  if (!data.user) throw new Error("NO_USER");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", data.user.id)
    .maybeSingle();
  if (profileError) throw profileError;

  return { user: data.user, isProfileComplete: !!profile?.username };
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("username, display_name, avatar_path")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function completeProfile(values: {
  displayName: string;
  username: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("NO_SESSION");

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    display_name: values.displayName,
    username: values.username,
  });
  if (error) throw error;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    return;
  }
}

export async function updateProfile({
  userId,
  display_name,
  avatar,
  username,
}: {
  userId: string
  display_name: string
  avatar?: File
  username: string
}) {
  let avatar_path: string | undefined

  if (avatar) {
    const path = `${userId}/avatar`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, avatar, {
        upsert: true,
        contentType: avatar.type,
        cacheControl: "3600",
      })

    if (uploadError) throw new Error(uploadError.message)

    const { data } = supabase.storage.from("avatars").getPublicUrl(path)

    avatar_path = `${data.publicUrl}?t=${Date.now()}`
  }

  const updates: {
    display_name: string
    username: string
    avatar_path?: string
  } = { display_name, username }

  if (avatar_path) updates.avatar_path = avatar_path

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    if (error.code === "23505") throw new Error("این نام کاربری قبلا استفاده شده است !")
    throw new Error(error.message)
  }

  return data
}
export async function removeAvatar(userId: string) {
  const { error: uploadErr } = await supabase.storage.from("avatars").remove([`/${userId}`])
  if (uploadErr) throw new Error(uploadErr.message)
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_path: null })
    .eq("id", userId).single()
  if (error) throw new Error(error.message);

}
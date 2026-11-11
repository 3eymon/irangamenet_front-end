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

export async function getCurrentUserWithProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, display_name, avatar_path")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw error;

  return { user, profile };
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

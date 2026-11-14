import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { getProfile, logOut } from "../services/auth";
import type { Tables } from "../types/database.types";
import toast from "react-hot-toast";

type Profile = Pick<
  Tables<"profiles">,
  "avatar_path" | "display_name" | "username"
> | null;

type AuthContextType = {
  user: User | null;
  profile: Profile;
  isAuthenticated: boolean;
  isProfileCompleted: boolean;
  isLoading: boolean;
  isProfileLoading: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const profileKey = (userId?: string) => ["profile", userId] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsInitialized(true);

      if (event === "SIGNED_OUT") {
        setUser(null);
        queryClient.clear();
        return;
      }

      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  const userId = user?.id;

  const { data: profile = null, isLoading: isProfileLoading } = useQuery({
    queryKey: profileKey(userId),
    queryFn: () => getProfile(userId!),
    enabled: isInitialized && Boolean(userId),
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = !isInitialized || (Boolean(userId) && isProfileLoading);

  const isProfileCompleted = Boolean(
    profile?.username?.trim() && profile?.display_name?.trim(),
  );
  const logoutMutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.success("با موفقیت از حساب کاربری خارج شدید 👋");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast.error("خروج از حساب انجام نشد. دوباره تلاش کنید.");
    },
  });
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      profile,
      isAuthenticated: Boolean(user),
      isProfileCompleted,
      isLoading,
      isProfileLoading,
      logout: () => logoutMutation.mutateAsync(),
      isLoggingOut: logoutMutation.isPending,
      refreshProfile: () =>
        queryClient.invalidateQueries({ queryKey: profileKey(userId) }),
    }),
    [
      user,
      profile,
      isProfileCompleted,
      isLoading,
      isProfileLoading,
      queryClient,
      userId,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

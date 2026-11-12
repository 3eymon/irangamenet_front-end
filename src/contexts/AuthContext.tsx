
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { User } from "@supabase/supabase-js";

import { supabase } from "../utils/supabase";
import { getCurrentUserWithProfile } from "../services/auth";
import type { Tables } from "../types/database.types";

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
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [profileVersion, setProfileVersion] = useState(0);

  const userId = user?.id;

  // Auth listener
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsInitialized(true);

      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        setUser(session?.user ?? null);
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
        setIsLoading(false);
      }

      if (event === "USER_UPDATED") {
        setUser(session?.user ?? null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch profile when user identity changes
  useEffect(() => {
    if (!isInitialized) return;

    if (!userId) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    let active = true;

    const syncProfile = async () => {
      setIsLoading(true);

      try {
        const result = await getCurrentUserWithProfile();

        if (!active) return;

        setUser(result?.user ?? null);
        setProfile(result?.profile ?? null);
      } catch (error) {
        if (!active) return;

        console.error("Failed to fetch user profile:", error);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    syncProfile();

    return () => {
      active = false;
    };
  }, [userId, isInitialized, profileVersion]);

  const refreshProfile = useCallback(async () => {
    setProfileVersion((version) => version + 1);
  }, []);

  const isAuthenticated = Boolean(user);

  const isProfileCompleted = Boolean(
    profile?.username?.trim() &&
    profile?.display_name?.trim()
  );

  const value = useMemo(
    () => ({
      user,
      profile,
      isAuthenticated,
      isProfileCompleted,
      isLoading,
      refreshProfile,
    }),
    [
      user,
      profile,
      isAuthenticated,
      isProfileCompleted,
      isLoading,
      refreshProfile,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

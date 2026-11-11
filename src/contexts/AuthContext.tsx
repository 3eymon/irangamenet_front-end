import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { getCurrentUserWithProfile } from "../services/auth";
import { Tables } from "../types/database.types";

type Profile = Pick<
  Tables<"profiles">,
  "avatar_path" | "display_name" | "username"
> | null;

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile;
  isAuthenticated: boolean;
  isProfileCompleted: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthInitialized) return;

    let active = true;

    const syncUser = async () => {
      if (!session) {
        setUser(null);
        setProfile(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const result = await getCurrentUserWithProfile();

        if (!active) return;

        setUser(result?.user ?? null);
        setProfile(result?.profile ?? null);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);

        if (!active) return;

        setUser(null);
        setProfile(null);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    syncUser();

    return () => {
      active = false;
    };
  }, [session,isAuthInitialized]);

  const isAuthenticated = !!user;

  const isProfileCompleted = Boolean(
    profile?.username?.trim() && profile?.display_name?.trim(),
  );

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isAuthenticated,
        isProfileCompleted,
        isLoading,
      }}
    >
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

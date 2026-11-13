import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookmarkIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import Image from "../ui/Image";
import { Button } from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../../services/auth";

const PROFILE_NAV_ITEMS = [
  { title: "صفحه اصلی", link: "/profile", icon: UserIcon, end: true },
  { title: "بازی های ذخیره شده", link: "/profile/saved", icon: BookmarkIcon },
  { title: "علاقه مندی ها", link: "/profile/favorites", icon: HeartIcon },
];

function ProfileLayout() {
  const {
    user,
    profile,
    isLoading,
    isProfileLoading,
    isAuthenticated,
    logout,
    isLoggingOut,
  } = useAuth();
  const showSkeleton = isLoading || isProfileLoading;
  const navigate = useNavigate();
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className="flex w-full items-start gap-5">
      <aside className="w-full max-w-xs rounded-xl border border-primary-500/20 bg-primary-500/5 p-4">
        <div className="flex items-center gap-2">
          {showSkeleton ? (
            <>
              <div className="size-10 shrink-0 animate-pulse rounded-full bg-neutral-700/40" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 animate-pulse rounded bg-neutral-700/40" />
                <div className="h-3 w-32 animate-pulse rounded bg-neutral-700/40" />
              </div>
            </>
          ) : (
            <>
              <Image
                icon
                src={profile?.avatar_path}
                alt="آواتار من"
                className="size-10 rounded-full"
              />
              <div className="min-w-0">
                <p className="truncate text-sm">
                  {profile?.display_name || profile?.username}
                </p>
                <p className="truncate text-xs text-neutral-400">
                  {user?.email}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <nav>
          <ul className="space-y-1">
            {PROFILE_NAV_ITEMS.map(({ title, link, icon: Icon, end }) => (
              <li key={link}>
                <NavLink
                  to={link}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-primary-800/30 text-white"
                        : "text-neutral-400 hover:bg-primary-800/10 hover:text-white"
                    }`
                  }
                >
                  <Icon className="size-4" />
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <Button
          onClick={logout}
          disabled={isLoggingOut}
          className="w-full bg-red-500/20 text-xs text-red-500 hover:bg-red-400/20"
        >
          {isLoggingOut ? "درحال خروج ..." : " خروج از حساب کاربری"}
        </Button>
      </aside>

      <div className="flex min-h-full w-full flex-1 flex-col gap-10 rounded-xl p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;

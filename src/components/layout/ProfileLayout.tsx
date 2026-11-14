import { Navigate, NavLink, Outlet } from "react-router-dom";
import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import Image from "../ui/Image";
import { Button } from "../ui/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
  const [confirmLogout, setConfirmLogout] = useState(false);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex w-full flex-col items-start gap-5 md:flex-row">
      <aside className="w-full md:sticky md:top-5 md:max-w-xs">
        <div className="mx-1 rounded-xl border border-primary-500/20 bg-primary-500/5 p-4">
          <div className="flex items-center gap-3">
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

          <div className="my-4 hidden h-px bg-white/10 md:block" />

          <nav className="hidden md:block">
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

          <div className="mt-4 hidden md:block">
            <AnimatePresence mode="wait" initial={false}>
              {confirmLogout ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  <Button
                    onClick={logout}
                    disabled={isLoggingOut}
                    className="flex-1 bg-red-500/20 text-xs text-red-400"
                  >
                    {isLoggingOut ? "در حال خروج..." : "تأیید خروج"}
                  </Button>
                  <Button
                    onClick={() => setConfirmLogout(false)}
                    disabled={isLoggingOut}
                    variant="outlined"
                    className="flex-1 text-xs"
                  >
                    لغو
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="logout"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <Button
                    onClick={() => setConfirmLogout(true)}
                    className="w-full bg-red-500/20 text-xs text-red-500 hover:bg-red-400/20"
                  >
                    خروج از حساب کاربری
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#111018]/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl md:hidden">
        <nav>
          <ul className="mb-1.5 grid grid-cols-4 items-center gap-1">
            {PROFILE_NAV_ITEMS.map(({ title, link, icon: Icon, end }) => (
              <li key={link}>
                <NavLink
                  to={link}
                  end={end}
                  className={({ isActive }) =>
                    `relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 text-[10px] transition-colors ${
                      isActive
                        ? "text-primary-300"
                        : "text-neutral-400 active:bg-white/5"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="size-5" />
                      <span className="truncate">{title}</span>
                      {isActive && (
                        <motion.span
                          layoutId="mobile-profile-tab"
                          className="absolute -top-2 h-0.5 w-7 rounded-full bg-primary-400"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}

            <li>
              <button
                type="button"
                onClick={() => {
                  if (isLoggingOut) return;

                  const confirmed = window.confirm(
                    "آیا مطمئن هستید که می‌خواهید از حساب کاربری خارج شوید؟",
                  );

                  if (confirmed) logout();
                }}
                disabled={isLoggingOut}
                className="flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-xl text-[10px] text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <ArrowPathIcon className="size-5 animate-spin" />
                ) : (
                  <ArrowRightOnRectangleIcon className="size-5" />
                )}

                <span>{isLoggingOut ? "در حال خروج" : "خروج"}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex min-h-full w-full min-w-0 flex-1 flex-col gap-10 rounded-xl p-2 sm:p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;

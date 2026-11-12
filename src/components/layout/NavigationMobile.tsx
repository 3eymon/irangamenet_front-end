import { Link, NavLink } from "react-router-dom";
import { useRef } from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useDimensions } from "../../hooks/use-dimensions";
import { navbarItems } from "./Navbar";
import "./navigation.css";
import { Backdrop } from "@mui/material";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../../services/auth";
import Image from "../ui/Image";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
      zIndex: 9999,
    },
  }),
  closed: {
    clipPath: "circle(20px at 205px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
      zIndex: 0,
    },
  },
};

export default function NavigationMobile() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  if (isOpen) {
    document.body.style.overflowY = "hidden";
  } else {
    setTimeout(() => {
      document.body.style.overflowY = "auto";
    }, 1000);
  }
  let x = window.matchMedia("(max-width: 700px)");
  function myFunction(x: any) {
    if (x.matches) {
      () => toggleOpen();
    } else {
      () => toggleOpen();
    }
  }
  myFunction(x);
  x.addEventListener("change", function () {
    myFunction(x);
  });
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="absolute inset-0 sm:hidden"
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpen}
        className="!z-30"
        onClick={() => toggleOpen()}
      ></Backdrop>
      <motion.div
        className="background z-30 w-60 bg-[#29293dda] text-white backdrop-blur"
        variants={sidebar}
      />
      <div className="relative">
        <Navigation toggle={() => toggleOpen()} isOpen={isOpen} />
        <MenuToggle toggle={() => toggleOpen()} />
      </div>
    </motion.div>
  );
}

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

function MenuToggle({ toggle }: { toggle: () => void }) {
  return (
    <motion.div className="relative">
      <button id="toggle-button" onClick={toggle} className="z-30 pr-2.5">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          className="w-5 text-white invert"
        >
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </button>
    </motion.div>
  );
}
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const variantsItem = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

function Navigation({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) {
  const { user, profile, isLoading } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toggle();
    },
  });

  return (
    <motion.ul
      variants={variants}
      dir="rtl"
      className={`absolute right-0 top-16 z-40 flex w-[241px] flex-col overflow-hidden text-white ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <motion.li variants={variantsItem} className="px-3 pb-3 pt-4">
        <span className="mb-2 block px-2 text-[11px] text-zinc-500">
          حساب کاربری
        </span>

        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3 rounded-xl bg-[#383950] px-3 py-3"
            >
              <div className="size-9 shrink-0 animate-pulse rounded-full bg-zinc-600/70" />
              <div className="flex flex-col gap-2">
                <div className="h-3 w-24 animate-pulse rounded bg-zinc-600/70" />
                <div className="h-2 w-16 animate-pulse rounded bg-zinc-700/70" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={user ? "user" : "guest"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Link
                onClick={toggle}
                to={user ? "/profile" : "/auth"}
                className="flex items-center gap-3 rounded-xl bg-[#383950] px-3 py-3 transition-colors active:bg-[#41435e]"
              >
                {user ? (
                  <Image
                    icon
                    src={profile?.avatar_path}
                    alt="تصویر پروفایل"
                    className="size-9 shrink-0 rounded-full bg-black object-cover !p-0.5"
                  />
                ) : (
                  <UserCircleIcon className="size-9 shrink-0 text-zinc-300" />
                )}

                <div className="flex min-w-0 flex-col gap-1">
                  <span
                    className={`truncate text-sm ${
                      user ? "text-primary-300" : "text-zinc-200"
                    }`}
                  >
                    {user
                      ? profile?.display_name?.trim() || "حساب کاربری"
                      : "ورود / ثبت‌نام"}
                  </span>

                  <span className="text-[11px] text-zinc-400">
                    {user ? "مشاهده پروفایل" : "به حساب خود وارد شوید"}
                  </span>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>

      <motion.li
        variants={variantsItem}
        className="mx-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <motion.li variants={variantsItem} className="px-3 pb-1 pt-3">
        <span className="mb-2 block px-2 text-[11px] text-zinc-500">
          منوی اصلی
        </span>
      </motion.li>

      {navbarItems.map((i) => (
        <motion.li
          key={i.id}
          variants={variantsItem}
          className="flex w-full items-center px-3 py-1"
        >
          <NavLink
            onClick={toggle}
            to={i.link}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-300 transition-colors aria-[current=page]:bg-[#383950] aria-[current=page]:font-PeydaMed aria-[current=page]:text-purple-400"
          >
            {i.icon}
            {i.title}
          </NavLink>
        </motion.li>
      ))}

      {user && !isLoading && (
        <>
          <motion.li
            variants={variantsItem}
            className="mx-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />

          <motion.li variants={variantsItem} className="px-3 py-3">
            <span className="mb-2 block px-2 text-[11px] text-zinc-500">
              مدیریت حساب
            </span>

            <button
              type="button"
              disabled={logoutMutation.isPending}
              onClick={() => logoutMutation.mutate()}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition-colors hover:bg-red-500/10 active:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeftEndOnRectangleIcon className="size-5 shrink-0" />

              {logoutMutation.isPending ? "در حال خروج..." : "خروج از حساب"}
            </button>
          </motion.li>
        </>
      )}
    </motion.ul>
  );
}

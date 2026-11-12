import {
  BookOpenIcon,
  HomeIcon,
  PuzzlePieceIcon,
  UserCircleIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { SiYoutubegaming } from "react-icons/si";
import NavigationMobile from "./NavigationMobile";
import { ReactNode } from "react";
import { Button } from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "../ui/Image";
import { AnimatePresence, motion } from "framer-motion";
type NavbarItemType = {
  id: number;
  title: string;
  link: string;
  icon: ReactNode;
};
export const navbarItems: NavbarItemType[] = [
  {
    id: 1,
    title: "خانه",
    link: "/",
    icon: (
      <HomeIcon className="inline-block h-5 w-5 group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
  {
    id: 3,
    title: "اخبار",
    link: "/news",
    icon: (
      <BookOpenIcon className="inline-block h-5 w-5 group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
  {
    id: 4,
    title: "بازی ها",
    link: "/games",
    icon: (
      <PuzzlePieceIcon className="inline-block h-5 w-5 group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
  {
    id: 5,
    title: "استریمر ها",
    link: "/streamers",
    icon: (
      <VideoCameraIcon className="inline-block h-5 w-5 group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
  {
    id: 6,
    title: "گیم نت ها",
    link: "/game-centers",
    icon: (
      <SiYoutubegaming className="inline-block h-5 w-5 group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
];
function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-5 font-Peyda text-sm max-sm:flex-row-reverse sm:py-2">
      <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-lg font-bold text-transparent">
        ایران گیم نت
      </h2>
      <NavigationMobile />
      <div className="absolute left-1/2 hidden -translate-x-1/2 sm:block">
        <NavLinks data={navbarItems} />
      </div>
      <UserBox />
    </nav>
  );
}

function UserBox() {
  const { user, profile, isLoading } = useAuth();

  const variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.18,
        ease: "easeOut",
      },
    },
    exit: { opacity: 0, transition: { duration: 0.12 } },
  };

  return (
    <div className="hidden sm:block">
      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.div
            key="skeleton"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex h-9 w-36 items-center gap-2 rounded-lg border border-zinc-700/60 bg-zinc-800/40 px-3"
          >
            <div className="size-5 shrink-0 animate-pulse rounded-full bg-zinc-700" />
            <div className="h-3 w-20 animate-pulse rounded bg-zinc-700" />
          </motion.div>
        ) : !user ? (
          <motion.div
            key="guest"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Button
              as={NavLink}
              to="/auth"
              variant="ghost"
              className="flex h-9 px-3.5 items-center justify-start gap-2 rounded-lg border border-primary-500/30 bg-primary-500/10"
            >
              <UserCircleIcon className="size-4 shrink-0 " />
              <span className="text-xs lg:text-sm font-medium">ورود / ثبت‌نام</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="user"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Button
              as={NavLink}
              to="/profile"
              variant="ghost"
              className="flex h-9 items-center justify-start gap-2 rounded-lg border border-primary-500/30 bg-primary-500/10 pl-5 pr-2 text-sm text-zinc-200"
            >
              <Image
                icon
                src={profile?.avatar_path}
                alt="تصویر پروفایل"
                className="size-6 rounded-full bg-black object-cover !p-0.5"
              />
              <span className="max-w-32 truncate text-xs text-primary-300 lg:text-sm font-medium line-clamp-1">
                {profile?.display_name?.trim() || "حساب کاربری"}
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;

function NavLinks({ data }: { data: NavbarItemType[] }) {
  return (
    <ul className="hidden gap-3 pt-1.5 text-xs sm:flex">
      {data.map((nav, index) => (
        <li key={index}>
          <NavLink
            className={`text-gray-500 aria-[current=page]:text-white`}
            to={nav.link}
          >
            {nav.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

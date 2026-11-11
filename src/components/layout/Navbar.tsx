import {
  BookOpenIcon,
  HomeIcon,
  PuzzlePieceIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiYoutubegaming } from "react-icons/si";

import NavigationMobile from "./NavigationMobile";
import { ReactNode, useState } from "react";
import { Button } from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  UserIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { logOut } from "../../services/auth";
import { useMutation } from "@tanstack/react-query";
import Image from "../ui/Image";

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
      <HomeIcon className="inline-block h-5 w-5  group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
  {
    id: 3,
    title: "اخبار",
    link: "/news",
    icon: (
      <BookOpenIcon className="inline-block h-5 w-5  group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
  {
    id: 4,
    title: "بازی ها",
    link: "/games",
    icon: (
      <PuzzlePieceIcon className="inline-block h-5 w-5  group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
  {
    id: 5,
    title: "استریمر ها",
    link: "/streamers",
    icon: (
      <VideoCameraIcon className="inline-block h-5 w-5  group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
  {
    id: 6,
    title: "گیم نت ها",
    link: "/game-centers",
    icon: (
      <SiYoutubegaming className="inline-block h-5 w-5  group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
];
function Navbar() {
  return (
    <nav className="flex justify-between max-sm:flex-row-reverse items-center text-sm py-5 sm:py-2 px-5 font-Peyda">
      <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold text-lg">
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

  if (isLoading) {
    return (
      <div className="hidden sm:flex h-9 w-36 items-center gap-2 rounded-lg border border-zinc-700/60 bg-zinc-800/40 px-3">
        <div className="size-5 shrink-0 animate-pulse rounded-full bg-zinc-700" />
        <div className="h-3 w-20 animate-pulse rounded bg-zinc-700" />
      </div>
    );
  }

  if (!user) {
    return (
      <Button
        as={NavLink}
        to="/auth"
        className="hidden sm:flex h-9 items-center gap-2 rounded-lg   px-3 text-sm font-medium"
      >
        <UserIcon className="size-4" />
        ورود / ثبت‌نام
      </Button>
    );
  }

  return (
    <Button
      as={NavLink}
      to="/profile"
      variant="ghost"
      className="hidden sm:flex h-9 items-center justify-start gap-2 rounded-lg border pl-5 pr-2  text-sm text-zinc-200 transition-all ease-linear border-primary-500/30 bg-primary-500/10"
    >
      <Image
        icon
        src={profile?.avatar_path}
        alt="تصویر پروفایل"
        className="size-6 !p-0.5 rounded-full object-cover bg-black"
      />
      <span className="max-w-32 truncate text-primary-300 text-xs lg:text-sm">
        {profile?.display_name?.trim() || "حساب کاربری"}
      </span>
    </Button>
  );
}

export default Navbar;

function NavLinks({ data }: { data: NavbarItemType[] }) {
  return (
    <ul className="gap-3 text-xs pt-1.5 hidden sm:flex">
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

import {
  BookOpenIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  PuzzlePieceIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { SiYoutubegaming } from "react-icons/si";

import NavigationMobile from "./NavigationMobile";
export const navBar = [
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
    link: "/gameNet",
    icon: (
      <SiYoutubegaming className="inline-block h-5 w-5  group-aria-[current=page]:[filter:drop-shadow(-25px_0px_10px_#c084fc)]" />
    ),
  },
];
function Navbar() {
  return (
    <nav className="flex justify-between items-center text-sm py-5 sm:py-2 px-5 font-Peyda flex-row-reverse md:flex-row">
      <h2 className="bg-gradient-to-r from-[#3b35b2] to-[#733cb3] bg-clip-text text-transparent font-bold text-lg">
        ایران گیم نت
      </h2>
      <NavigationMobile />
      <NavLinks navBar={navBar} />
      <NavLink
        to="/auth/login"
        className="text-xs hidden sm:flex bg-gradient-to-r from-[#3b35b2] to-[#733cb3] px-5 py-1 transition-transform ease-linear rounded-md shadow-[#733cb39c_0px_0px_5px] hover:scale-95 "
      >
        ورود
      </NavLink>
    </nav>
  );
}

export default Navbar;

function NavLinks({ navBar }) {
  return (
    <ul className="gap-3 text-xs pt-1.5 hidden sm:flex">
      {navBar.map((nav, index) => (
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

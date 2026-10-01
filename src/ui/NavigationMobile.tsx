import { Link, NavLink } from "react-router-dom";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { navBar } from "./Navbar";
import "./navigation.css";
import { Backdrop, Button } from "@mui/material";
import {
  ArrowLeftCircleIcon,
  ChevronLeftIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

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
  function myFunction(x) {
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
        className="background bg-[#29293dda] backdrop-blur text-white w-60 z-30 "
        variants={sidebar}
      />
      <div className="relative">
        <Navigation toggle={() => toggleOpen()} isOpen={isOpen} />
        <MenuToggle toggle={() => toggleOpen()} />
      </div>
    </motion.div>
  );
}

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

function MenuToggle({ toggle }) {
  return (
    <motion.div className=" relative">
      <button onClick={toggle} className="z-30 pr-2.5">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          className="text-white invert w-5"
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
const variantsItem2 = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: 50,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
};

function Navigation({ toggle, isOpen }) {
  return (
    <motion.ul
      variants={variants}
      dir="rtl"
      className={`absolute  top-16 right-0 z-40 h-full flex flex-col  font-PeydaLight ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <motion.li
        variants={variantsItem}
        className="flex items-center py-2 px-2"
      >
        <Link
          onClick={toggle}
          to="/auth"
          className="group flex items-center gap-3 py-5 bg-[#383950]  px-[115px] pr-2 translate-x-2 text-sm"
        >
          <UserCircleIcon className="size-7" />
          ورود یا ثبت نام
        </Link>
      </motion.li>
      {navBar.map((i) => (
        <motion.li
          key={i.id}
          variants={variantsItem}
          className="flex items-center py-2 px-3"
        >
          <NavLink
            onClick={toggle}
            className="group flex items-center gap-3 transition-all ease-linear py-3 translate-x-1   w-full aria-[current=page]:font-PeydaMed  aria-[current=page]:bg-[#383950]/90 aria-[current=page]:text-purple-400 backdrop-blur rounded-xl px-32 pr-2 text-sm"
            to={i.link}
          >
            {i.icon}
            {i.title}
          </NavLink>
          <ChevronLeftIcon className="size-5 translate-x-8 pointer-events-none" />
        </motion.li>
      ))}
    </motion.ul>
  );
}

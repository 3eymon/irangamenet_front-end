import { ramp } from './src/utils/ramp';
import type { Config } from "tailwindcss";
import tailwindcssAnimated from "tailwindcss-animated";


const BRAND_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
const SURFACE_STEPS = [100, 200, 300] as const;

const fallback = ["ui-sans-serif", "system-ui", "sans-serif"];

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    container: { center: true },

    screens: {
      mq500: "540px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      colors: {
        primary: ramp("primary", BRAND_STEPS),
        secondary: ramp("secondary", BRAND_STEPS),
        background: ramp("background", SURFACE_STEPS),
        surface: ramp("surface", SURFACE_STEPS),
      },

      fontFamily: {
        sans: ["Peyda", ...fallback],
        Peyda: ["Peyda", ...fallback],
        PeydaMed: ["Peyda", ...fallback],
        Jaro: ["Jaro", ...fallback],
      },

      boxShadow: {
        primary: "0 10px 35px rgb(var(--ign-primary) / 0.18)",
        secondary: "0 10px 35px rgb(var(--ign-secondary) / 0.18)",
        glow: "0 0 30px rgb(var(--ign-primary) / 0.25)",
      },

      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, rgb(var(--ign-primary)), rgb(var(--ign-secondary)))",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgb(var(--ign-primary) / 0.18), rgb(var(--ign-secondary) / 0.12))",
      },
    },
  },

  plugins: [tailwindcssAnimated],
} satisfies Config;
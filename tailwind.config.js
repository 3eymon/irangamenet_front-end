const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
    },

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
        primary: {
          50: "rgb(var(--ign-primary-50) / <alpha-value>)",
          100: "rgb(var(--ign-primary-100) / <alpha-value>)",
          200: "rgb(var(--ign-primary-200) / <alpha-value>)",
          300: "rgb(var(--ign-primary-300) / <alpha-value>)",
          400: "rgb(var(--ign-primary-400) / <alpha-value>)",
          500: "rgb(var(--ign-primary-500) / <alpha-value>)",
          600: "rgb(var(--ign-primary-600) / <alpha-value>)",
          700: "rgb(var(--ign-primary-700) / <alpha-value>)",
          800: "rgb(var(--ign-primary-800) / <alpha-value>)",
          900: "rgb(var(--ign-primary-900) / <alpha-value>)",
          DEFAULT: "rgb(var(--ign-primary) / <alpha-value>)",
        },

        secondary: {
          50: "rgb(var(--ign-secondary-50) / <alpha-value>)",
          100: "rgb(var(--ign-secondary-100) / <alpha-value>)",
          200: "rgb(var(--ign-secondary-200) / <alpha-value>)",
          300: "rgb(var(--ign-secondary-300) / <alpha-value>)",
          400: "rgb(var(--ign-secondary-400) / <alpha-value>)",
          500: "rgb(var(--ign-secondary-500) / <alpha-value>)",
          600: "rgb(var(--ign-secondary-600) / <alpha-value>)",
          700: "rgb(var(--ign-secondary-700) / <alpha-value>)",
          800: "rgb(var(--ign-secondary-800) / <alpha-value>)",
          900: "rgb(var(--ign-secondary-900) / <alpha-value>)",
          DEFAULT: "rgb(var(--ign-secondary) / <alpha-value>)",
        },

        background: {
          DEFAULT: "rgb(var(--ign-background) / <alpha-value>)",
          100: "rgb(var(--ign-background-100) / <alpha-value>)",
          200: "rgb(var(--ign-background-200) / <alpha-value>)",
          300: "rgb(var(--ign-background-300) / <alpha-value>)",
        },

        surface: {
          DEFAULT: "rgb(var(--ign-surface) / <alpha-value>)",
          100: "rgb(var(--ign-surface-100) / <alpha-value>)",
          200: "rgb(var(--ign-surface-200) / <alpha-value>)",
          300: "rgb(var(--ign-surface-300) / <alpha-value>)",
        },
      },

      fontFamily: {
        Peyda: ["Peyda"],
        PeydaLight: ["Peyda-light"],
        PeydaBlack: ["Peyda-black"],
        PeydaMed: ["Peyda-med"],
        Jaro: ["Jaro"],
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

  plugins: [
    require("daisyui"),
    nextui(),
    require("tailwindcss-animated"),
  ],
};
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-black": "#040404",
        "base-white": "#FFFEFC",
      },
      fontFamily: {
        custom: [
          "Helvetica Neue",
          "Arial",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Meiryo",
          "sans-serif",
        ],
      },
      keyframes: {
        animate: {
          "0%, 100%": { transform: "translateY(-20px)" },
          "50%": { transform: "translateY(20px)" },
        },
      },
    },
    screens: {
      xs: "560px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  darkMode: "class",
};

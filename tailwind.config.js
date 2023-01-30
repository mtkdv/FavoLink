/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-black": "#1D1D1D",
        "base-white": "#FFFEFC",
        // 20 2 98
        primary: "#FBF7F5",
        // 20 5 93
        secondary: "#EEE6E2",
        // accent: "#c1a5a3",
        // accent: "#d78e85",
        // accent: "#f9869d",
        // accent: "#DFDAD6",
        // accent: "#FCEDD9",
        // accent: "#E6BDAD",
        // accent: "#B6A0A1",
        // accent: "#5E4145",
        // 17 39 91
        accent: "#e8a78e",
        // typo: "#e8a78e",
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
        moveUpArrow: {
          "0%, 10%": {
            transform: "translateY(1px)",
          },
          "75%, 100%": {
            transform: "translateY(-3px)",
          },
        },
        moveDownArrow: {
          "0%, 10%": {
            transform: "translateY(-1px)",
          },
          "75%, 100%": {
            transform: "translateY(+3px)",
          },
        },
        myPing: {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
      },
      animation: {
        moveUpArrow: "moveUpArrow 1s ease-out infinite",
        moveDownArrow: "moveDownArrow 1s ease-out infinite",
        myPing: "myPing 1s linear infinite",
      },
    },
    screens: {
      xs: "600px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  darkMode: "class",
};

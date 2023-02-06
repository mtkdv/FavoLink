const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
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
        primary: "#FBF7F5",
        // 20 2 98
        secondary: "#EEE6E2",
        // 20 5 93
        // accent: "#c1a5a3",
        // accent: "#d78e85",
        // accent: "#f9869d",
        // accent: "#DFDAD6",
        // accent: "#FCEDD9",
        // accent: "#E6BDAD",
        // accent: "#B6A0A1",
        // accent: "#5E4145",
        // accent: "#463f3a",
        accent: "#e8a78e",
        // 17 39 91
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
      fontSize: {
        xxxs: ["0.625rem", { lineHeight: "0.75rem" }],
        xxs: ["0.6875rem", { lineHeight: "0.875rem" }],
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
        // shake: {
        //   "10%, 90%": {
        //     transform: "translateX(-1px)",
        //   },
        //   "20%, 80%": {
        //     transform: "translateX(2px)",
        //   },
        //   "30%, 50%, 70%": {
        //     transform: "translateX(-4px)",
        //   },
        //   "40%, 60%": {
        //     transform: "translateX(4px)",
        //   },
        // },
        shake: {
          "20%, 60%": {
            transform: "translateX(-2px)",
          },
          "40%, 80%": {
            transform: "translateX(2px)",
          },
        },
        pulse: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.01)",
          },
        },
      },
      animation: {
        moveUpArrow: "moveUpArrow 1s ease-out infinite",
        moveDownArrow: "moveDownArrow 1s ease-out infinite",
        myPing: "myPing 1s linear infinite",
        shake: "shake 0.41s ease-in-out 0.2s both",
        pulse: "pulse 3s ease-in-out infinite",
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

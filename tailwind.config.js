/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-1000": "rgb(17,17,19)",
        "gray-1100": "rgb(10,10,11)",
        "base-black": "#262627",
        "base-white": "#FAF7F5",
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
  },
  plugins: [require("@tailwindcss/line-clamp")],
  darkMode: "class",
};

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "img-profile": "url('/profile.svg')",
        "img-add-video": "url('/add_video.svg')",
      },
      backgroundPosition: {
        "center-90": "center 90%",
      },
      colors: {
        "base-black": "#1D1D1D",
        "base-white": "#faf9f9",
        accent: "#e8a78e",
        "tonys-pink": "#e8a78e",
        isabelline: {
          50: "#FFFBF9",
          // light: "#fbf9f8",
          light: "#FBF7F5",
          DEFAULT: "#eee6e2",
        },

        cocoa: {
          50: "#fcfbf8",
          100: "#faf0d9",
          200: "#f5d7b1",
          300: "#e7ae7d",
          400: "#da804f",
          500: "#c55d30",
          600: "#a8431f",
          700: "#823219",
          800: "#5a2313",
          900: "#39150c",
        },
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
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        90: "22.5rem",
        "3xl": "768px",
        "full-nav": "calc(100vh - 56px)",
        // (page + header) = (34px + 16 * 4px) => 98px
        "dashboard-page-main": "calc(100vh - 98px)",
      },
      minHeight: {
        // (my-4 + border) = (16px * 2 + 1px * 2) => 34px
        "dashboard-page": "calc(100vh - 34px)",
        // (pt-36 + mt-6 + text-4xl + space-y-2 + text-xs + pb-6)
        // = (36 * 4px + 6 * 4px + 40px + 2 * 4px + 16px + 6 * 4px) => 256px
        "main-content": "calc(100vh - 256px)",
        // (h-30 * 4px) => 120px
        "top-main": "calc(100vh - 120px)",
        // (h-20 * 4px) => 80px
        "md-top-main": "calc(100vh - 80px)",
      },
      minWidth: {
        xl: "36rem" /** 576px */,
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
        loadingPulse: {
          // "0%, 100%": {
          //   transform: "scale(1)",
          // },
          "50%": {
            opacity: "0.4",
            // backgroundColor: "white",
          },
        },
        appearance: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        skeleton: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        skeleton2: {
          "0%": {
            backgroundPosition: 0,
          },
          "0%": {
            backgroundPosition: "200%",
          },
        },
        toTop: {
          "0%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(-120%)",
          },
          "51%": {
            transform: "translateY(120%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
      },
      animation: {
        moveUpArrow: "moveUpArrow 1s ease-out infinite",
        moveDownArrow: "moveDownArrow 1s ease-out infinite",
        myPing: "myPing 1s linear infinite",
        shake: "shake 0.41s ease-in-out 0.2s both",
        loadingPulse: "loadingPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        appearance: "appearance 0.7s linear",
        skeleton: "skeleton 1.2s linear infinite",
        skeleton2: "skeleton2 1.2s linear infinite",
        toTop: "toTop 0.s ease-in",
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

import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

import type { Config } from "tailwindcss";

export default {
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
        isabelline: "#eee6e2",
        twitter: "#2A9BF0",
        stone: {
          150: "#EFEEEE",
        },
        liver: {
          50: "#f7f6f5",
          100: "#eeecec",
          200: "#d5d0cf",
          300: "#bbb3b1",
          400: "#897b77",
          500: "#56423d",
          600: "#4d3b37",
          700: "#41322e",
          800: "#342825",
          900: "#2a201e",
        },
        juniper: {
          50: "#f8f9f9",
          100: "#f1f3f4",
          200: "#dbe2e3",
          300: "#c5d0d1",
          400: "#9aadaf",
          500: "#6E8A8D",
          600: "#637c7f",
          700: "#53686a",
          800: "#425355",
          900: "#364445",
        },
        khaki: {
          50: "#fcfbf9",
          100: "#f9f7f3",
          200: "#efeae0",
          300: "#e5ddce",
          400: "#d2c4a9",
          500: "#beaa84",
          600: "#ab9977",
          700: "#8f8063",
          800: "#72664f",
          900: "#5d5341",
        },
      },
      dropShadow: {
        "white-black": [
          `1px 1px 0 ${colors.white}`,
          // `1.5px 1.5px 0 rgba(${colors.black} / 0.1)`,
          `1.5px 1.5px 0 rgb(0 0 0 / 0.1)`,
        ],
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
        // h24(header) * 4px => 96px
        "full-nav": "calc(100vh - 96px)",
        // (page + header) = (34px + 16 * 4px) => 98px
        "dashboard-page-main": "calc(100vh - 98px)",
      },
      minHeight: {
        // (my-4 + border) = (16px * 2 + 1px * 2) => 34px
        "dashboard-page": "calc(100vh - 34px)",
        // (pt-36 + mt-6 + text-4xl + space-y-2 + text-xs + pb-6)
        // = (36 * 4px + 6 * 4px + 40px + 2 * 4px + 16px + 6 * 4px) => 256px
        "main-content": "calc(100vh - 256px)",
        // h-30(footer) * 4px => 120px
        "top-main": "calc(100vh - 120px)",
        // h-20(md:footer) * 4px => 80px
        "md-top-main": "calc(100vh - 80px)",
      },
      minWidth: {
        xl: "36rem" /** 576px */,
      },
      ringWidth: {
        3: "3px",
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
        // skeleton2: {
        //   "0%": {
        //     backgroundPosition: 0,
        //   },
        //   "0%": {
        //     backgroundPosition: "200%",
        //   },
        // },
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
  // plugins: [require("@tailwindcss/line-clamp")],
  darkMode: "class",
} satisfies Config;

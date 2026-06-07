import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        belaca: {
          blue:    "#003DA5",
          navy:    "#001C5C",
          sky:     "#009FE3",
          cyan:    "#00B4D8",
          white:   "#FFFFFF",
          offwhite:"#F4F6FA",
          gray:    "#6B7280",
          dark:    "#111827",
          light:   "#E8EDF7",
          border:  "#C8D3E8",
          green:   "#1A6B3C",
          amber:   "#BA7517",
          red:     "#C0392B",
        }
      },
      fontFamily: {
        display: ["'Univers'", "'Helvetica Neue'", "Helvetica", "sans-serif"],
        body:    ["'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        "fade-up":    "fadeUp 0.5s ease forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-right":"slideRight 0.4s ease forwards",
        "ticker":     "ticker 30s linear infinite",
      },
      keyframes: {
        fadeUp:     { "0%":{ opacity:"0", transform:"translateY(16px)" }, "100%":{ opacity:"1", transform:"translateY(0)" } },
        fadeIn:     { "0%":{ opacity:"0" }, "100%":{ opacity:"1" } },
        slideRight: { "0%":{ transform:"translateX(-100%)" }, "100%":{ transform:"translateX(0)" } },
        ticker:     { "0%":{ transform:"translateX(0)" }, "100%":{ transform:"translateX(-50%)" } },
      }
    },
  },
  plugins: [],
} satisfies Config;

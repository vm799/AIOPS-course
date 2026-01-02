import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0B0F14",
          elevated: "#111827",
        },
        accent: {
          primary: "#3B82F6",
          secondary: "#22D3EE",
        },
        text: {
          primary: "#E5E7EB",
          muted: "#9CA3AF",
        },
      },
      animation: {
        "fade-in": "fadeIn 240ms ease-in",
        "slide-up": "slideUp 240ms ease-out",
        "scale-in": "scaleIn 240ms ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

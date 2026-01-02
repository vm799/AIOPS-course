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
          neon: {
            cyan: "#22D3EE",
            green: "#10B981",
            emerald: "#34D399",
          },
        },
        text: {
          primary: "#E5E7EB",
          muted: "#9CA3AF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "neon-gradient": "linear-gradient(135deg, #22D3EE 0%, #10B981 100%)",
        "neon-gradient-radial": "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        neon: "0 0 30px rgba(34, 211, 238, 0.5)",
        "neon-lg": "0 0 50px rgba(34, 211, 238, 0.3)",
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

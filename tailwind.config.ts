import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        inactive: "var(--inactive)",
        primary: "var(--primary)",
        "text-primary": "#000000",
        "text-secondary": "#6b7280",
        "primary-100": "hsl(var(--primary-hue) 100% 98%)",
        "primary-200": "hsl(var(--primary-hue) 100% 94%)",
        "primary-300": "hsl(var(--primary-hue) 100% 90%)",
        "primary-400": "hsl(var(--primary-hue) 100% 86%)",
        "primary-500": "var(--primary)",
        "primary-600": "hsl(var(--primary-hue) 100% 30%)",
        "primary-700": "hsl(var(--primary-hue) 100% 24%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out infinite -4s",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(4deg)",
          },
        },
      },
      backgroundImage: {
        "primary-fade":
          "linear-gradient(to bottom, hsl(var(--primary-hue) 100% 98%) 0%, hsl(var(--primary-hue) 100% 100%) 100%)",
        "primary-radial":
          "radial-gradient(circle at 50% 50%, hsl(var(--primary-hue) 100% 94%) 0%, transparent 70%)",
      },
      gradientColorStopTheme: {
        "primary-stops": "var(--primary), hsl(var(--primary-hue) 100% 50%)",
      },
    },
  },
  plugins: [typography],
};

export default config;

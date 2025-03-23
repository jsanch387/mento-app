import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
// import lineClamp from "@tailwindcss/line-clamp"; // Uncomment if needed

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
      },
    },
  },
  plugins: [
    typography,
    // lineClamp, // Uncomment this line if using line clamping
  ],
};

export default config;

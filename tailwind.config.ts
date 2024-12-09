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
        background: "var(--background)",
        inactive: "var(--inactive)",
        primary: "var(--primary)",
        "text-primary": "#000000", // Black for primary text
        "text-secondary": "#6b7280", // Gray for secondary text
      },
    },
  },
  plugins: [],
} satisfies Config;

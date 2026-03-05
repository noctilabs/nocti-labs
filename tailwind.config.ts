import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        'section-x': '3rem',
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        footer: "#e9e8e7",
        accent: "#00ff11",
        muted: "#a8a8a8",
        blue: "#1500ff",
      },
      fontFamily: {
        display: ["var(--font-display)", "'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
        body: ["var(--font-body)", "'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "'Courier New'", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

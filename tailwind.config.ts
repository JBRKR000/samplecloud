import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1115",
        border: "#1F2436",
        primary: "#F5A623",
        secondary: "#141823",
        card: "#111522",
        input: "#141823",
        muted: "#111522",
        success: "#4ADE80",
        accent: "#7EA6FF",
        warning: "#FBBF24",
        destructive: "#E57373",
        sidebar: "#0B0D12",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

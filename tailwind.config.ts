import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#f5f0e6",
        black: "#000000",
        "brand-bg": "#f5f0e6",
        "brand-text": "#000000",
      },
    },
  },
  plugins: [],
};

export default config;

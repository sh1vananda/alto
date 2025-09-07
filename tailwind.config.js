// tailwind.config.js

import preset from "@lynx-js/tailwind-preset";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        foreground: "#EDEDED",
        secondary: "#A0A0A0",
        accent: "#FFFFFF",
      },
    },
  },
  plugins: [],
};

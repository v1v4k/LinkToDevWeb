/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        "linktodev-light": {
          "primary": "#2563eb",
          "base-100": "#f0f5ff",
          "base-200": "#e8eeff",
          "base-300": "#d0d9f5",
          "base-content": "#0f172a",
        },
        "linktodev-dark": {
          "primary": "#3b82f6",
          "base-100": "#080c14",
          "base-200": "#0f1624",
           "base-300": "#1e2d45",
          "base-content": "#f1f5f9",
        },
      },
    ],
  },
};

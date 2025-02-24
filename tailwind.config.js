/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui,],
  daisyui: {
    themes:[{mytheme: {
      "primary": "#e8e5e480",
      "secondary": "#7f7f7f",
      "neutral": "#000000",
      "base-100": "#ffffff",}}]
  }
}
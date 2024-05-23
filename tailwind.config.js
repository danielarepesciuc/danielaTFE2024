/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxl: { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "989px" },
      md: { max: "767px" },
      sm: { max: "575px" },
    },
    extend: {},
  },
  plugins: [],
};

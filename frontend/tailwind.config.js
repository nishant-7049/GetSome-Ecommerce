/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lg: { max: "1024px" },

      md: { max: "720px" },

      sm: { max: "480px" },
    },

    extend: {},
  },
  plugins: [],
};

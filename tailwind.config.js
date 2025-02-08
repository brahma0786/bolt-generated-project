/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gist: ["Gist", "sans-serif"], // Add Gist font family
      },
    },
  },
  plugins: [],
};

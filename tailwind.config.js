/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F6FEB",
        borderCol: "#E2E8F0",
        bgCol: "#F8FAFC"
      },
      maxWidth: { 'screen-edu': '1024px' }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5a52ff', // Add Papernest color
      },
    },
  },
  plugins: [],
}


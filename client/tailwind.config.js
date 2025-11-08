/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line is crucial
  ],
  theme: {
    extend: {
      fontFamily: {
        // This adds the 'Inter' font, which my code uses
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
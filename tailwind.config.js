/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          300: '#FFCBA4', // Light peach
          600: '#FFB17C', // Medium peach
          900: '#FF9055', // Dark peach
        },
        lilac: {
          300: '#C8A2C8', // Light lilac
          600: '#A479A4', // Medium lilac
          900: '#7A517A', // Dark lilac
        },
      },
    },
  },
  plugins: [],
};

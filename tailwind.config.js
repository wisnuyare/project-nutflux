/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          customGray: "#E5E5E5",
          customDarkGray: "#929292",
          darkGray: '#1E232B',
          customRed: '#FF0000',
        },
        fontFamily: {
            sans: ["Montserrat", "sans-serif"], 
        },
        opacity: {
            13: '0.13',
        }
      },
    },
    plugins: [],
  };
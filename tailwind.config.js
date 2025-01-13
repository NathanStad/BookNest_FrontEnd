/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#E9E1D6',
        'primary': '#593D3B',
        'title': '#707C6A',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
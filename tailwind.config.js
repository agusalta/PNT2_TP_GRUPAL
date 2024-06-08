/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        customDarkGreen: '#001514',
        customWhite: '#FBFFFE',
        customDarkRed: '#6B0504',
        customOrange: '#A3320B',
        customGold: '#E6AF2E',
      },
    },
    plugins: [],
  },
}

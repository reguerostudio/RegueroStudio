/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tinta: '#0A0A0A',
        papel: '#F5F5F0',
        acento: '#0033FF',
        'acento-2': '#0044FF',
        'marina-top': '#57b8bc',
        'marina-bot': '#152636',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"Bodoni Moda"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

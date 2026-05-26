/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        verde: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        tierra: {
          50:  '#fdf6ee',
          100: '#fae8cc',
          200: '#f4cd95',
          600: '#a85c12',
          700: '#8a4610',
          800: '#6d340d',
        },
        cosecha: {
          400: '#facc15',
          500: '#eab308',
        },
      },
    },
  },
  plugins: [],
};

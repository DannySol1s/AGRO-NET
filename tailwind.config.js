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
        // Verde Bosque — color principal del sistema
        verde: {
          50:  '#f0f4f1',
          100: '#d6e2d4',
          200: '#adc4ab',
          300: '#84a681',
          400: '#5c8858',
          500: '#465D43',
          600: '#3a4f38',
          700: '#2d4030',
          800: '#1F3D36',
          900: '#162b28',
        },
        // Tierra — fondos y texto cálido
        tierra: {
          50:  '#f8f6f3',
          100: '#ede9e3',
          200: '#ddd8cf',
          300: '#cdc6bb',
          400: '#C1BAAE',
          500: '#a8a098',
          600: '#8a7e74',
          700: '#5c5248',
          800: '#4A4A4A',
        },
        // Cosecha / Terracota — CTAs y acentos cálidos
        cosecha: {
          400: '#c27a5a',
          500: '#9E5A38',
        },
        // Superficies y fondo general
        fondo:   '#D0CAC0',
        surface: '#C1BAAE',
        carbon:  '#1A1A1A',
      },
      fontFamily: {
        poppins:          ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semi':   ['Poppins_600SemiBold'],
      },
    },
  },
  plugins: [],
};

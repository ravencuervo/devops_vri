/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unap: {
          navy: '#030D4F',        // Azul marino - Principal institucional
          blue: '#0056b3',        // Azul - Para botones y enlaces
          green: '#22c55e',       // Verde - Para estados positivos y hover
          lightGray: '#E7EDEA',   // Gris claro - Fondos suaves
          yellow: '#FFC52C',      // Amarillo - Acentos y CTAs
          red: '#FB0C06',         // Rojo - Alertas y destacados
          skyBlue: '#CEECEF',     // Celeste pálido - Fondos secundarios
          white: '#ffffff',       // Blanco
          darkText: '#1f2937',    // Texto oscuro para contraste
        },
        idi: {
          dark: '#383939',
          green: '#149C68',       // Deep Green
          accent: '#38C958',      // Vibrant Green
          lime: '#AEE637',        // Lime
          cream: '#FFFEDB',       // Pale Yellow
        },
        'vri-system': {
          cream: '#F8F8EC',
          lime: '#AEDD2B',
          blue: {
            500: '#066699',
            700: '#0A5483',
            900: '#02416D',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

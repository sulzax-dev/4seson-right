/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF5F2',
          100: '#FFE8E2',
          200: '#FFD1C5',
          300: '#FFA48D',
          400: '#FF6B4A',
          500: '#FD441B',
          600: '#E03610',
          700: '#BC2807',
          800: '#94220B',
          900: '#7A1F0D',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 10px 30px -10px rgba(253, 68, 27, 0.35)',
        'premium': '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bd303': {
          'dark-grey': '#0f0f0f',
          'dark-purple': '#4a148c',
          'purple-accent': '#7b1fa2',
          'gold': '#ffd700',
          'dark-bg': '#1a1a1a',
        }
      },
      fontFamily: {
        'sans': ['Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

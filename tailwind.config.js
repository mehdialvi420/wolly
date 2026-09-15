/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Placeholder palette — replace hex values later
        primary: '#2C2A25',
        secondary: '#C9A26D',
        background: '#FBF6DF',
        hero: '#FBF6DF',
        accent: '#7A8B6F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

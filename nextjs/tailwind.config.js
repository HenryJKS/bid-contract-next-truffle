/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Se você estiver usando a pasta `app`
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },  
      },
      animation: {
        blink: 'blink 1.4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

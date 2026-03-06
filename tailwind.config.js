const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,ts,tsx}',
    './components/**/*.{js,ts,jsx,ts,tsx}',
    './pages/**/*.{js,ts,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: '#4a90e2',
        secondary: '#50e3c2',
        accent: '#f5a623',
        neutral: '#f8f8f8',
        'dark-gray': '#4a4a4a',
        'light-gray': '#eaeaea',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
};
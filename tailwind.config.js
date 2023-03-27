/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minWidth: {
      '1/2': '50%',
    },
    maxWidth: {
      '1/2': '50%',
      '1/3': '33%',
      '4/7': '57%',
      '3/7': '43%',
      '1/5': '20%',
      '3/4': '75%',
      '3/5': '60%',
      '7/8': '87%',
    },

    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '1920px',
    },
    extend: {
      spacing: {
        '128': '32rem',
        '152': '40rem',
        '190': '50rem',
        '220': '60rem',
        '380': '100rem',
        '464': '116rem',
      },
      colors: {
      },
    },
  },
  plugins: [],
}

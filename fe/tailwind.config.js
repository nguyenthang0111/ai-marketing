/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        body: ['Quicksand']
      },

      colors: {
        customColor:{
          'button':'#1eb9ee'
        },
        'primary': 'rgb(249 115 22)', // Dark Orange 
        'primary-bold': 'rgb(234 88 12)',
        'primary-light': 'rgb(251 146 60)',
        'dark-gray': '#06070980',
        'dark-gray-bold': '#060709',
        'success': "#4bbf73",
        'success-hover': "#40a262",
        'success-light': '#EAFFF1',
        'success-clarity': 'rgba(23, 198, 83, .2)',
        'danger': '#d9534f',
        'danger-hover': '#b84743',
        'danger-light': '#FFEEF3',
        'danger-clarity': 'rgba(248, 40, 90, .2)',
        'warning': '#F6B100',
        'warning-hover': '#c38c40',
        'warning-light': '#FFF8DD',
        'warning-clarity': 'rgba(246, 177, 0, .2)',
        'info':'#1F9BCF',
        'info-hover':'#1a84b0',
        'info-clarity':'#1F9BCF',
        'heading-color': '#495057',
        'description-color':"#495057"
      },
    },
  },
  plugins: [
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        geist: 'Geist',
      },
      width: {
        desktop: '1440px',
      },
      screens: {
        desktop: '1440px',
      },

      colors: {
        // Main Color Pallette
        'primary-color': '#18181A',
        'secondary-color': '#ECEEF0',
        'third-color': '#222222',
        'success-color': '#00A84F',

        'accent-color': '#f75542',
        'accent-secondary-color': '#29405B',
        'inactive-color': '#A1A0A0',
        'gray-button-color': '#F6F6F6',

        'border-color': '#cbcbcb13',

        'text-primary-color': '#ECEEF0',
        'text-secondary-color': '#18181A',
      },
    },
  },
  plugins: [],
}

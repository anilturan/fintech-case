/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C8EE44',
        ink: '#1B212D',
        secondary: '#929EAE',
        authInk: '#1B212D',
        authMuted: '#78778B',
        panel: '#F7F8FA',
        accent: '#0EA5E9'
      },
      boxShadow: {
        card: '0 18px 40px rgba(16, 24, 40, 0.08)'
      },
      fontFamily: {
        sans: ['"Kumbh Sans"', 'sans-serif']
      },
    }
  },
  plugins: []
};

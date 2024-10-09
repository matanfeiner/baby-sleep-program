module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        'safe': 'env(safe-area-inset-top)'
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.pt-safe': {
          paddingTop: 'max(env(safe-area-inset-top), 1.5rem)'
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}
module.exports = {
    content: [
        './src/**/*.html',
      ],
    theme: {
      extend: {
        keyframes: {
          shake: {
            '25%': { transform: 'translateX(-3px)' },
            '50%': { transform: 'translateX(3px)' },
            '75%': { transform: 'translateX(-3px)' },
            '100%': { transform: 'translateX(3px)' },
          },
        },
        animation: {
          'shake': 'shake 0.5s ease-in-out both',
        },
      },
    },
    plugins: [],
  }
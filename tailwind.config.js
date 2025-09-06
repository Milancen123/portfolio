module.exports = {
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwind-scrollbar'),
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
      },
    },
    keyframes: {
      pop: {
        '0%': { transform: 'scale(0.8)', opacity: '0' },
        '80%': { transform: 'scale(1.05)', opacity: '1' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
    },
    animation: {
      pop: 'pop 0.25s ease-out',
    },
  },
}

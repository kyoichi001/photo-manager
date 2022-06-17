module.exports = {
  content: ["./src/**/*.{jsx,js,ts,tsx}", "./dist/index.html"],
  theme: {
    extend: {
      backdropBlur: true,
    },
  },
  variants: {
    extend: {
      brightness: ['hover', 'focus'],
    },
  },
  plugins: [],
}

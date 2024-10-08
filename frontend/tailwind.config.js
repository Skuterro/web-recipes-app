/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#101215",
        "custom-gray": "#b0b1b0",
        "custom-gray-2": "#383c42",
        "custom-gray-3": "#24272a",
        primary: "#fe8037",
        secondary: "#246cd1",
        "custom-green": "#2a9d8f",
      },
    },
  },
  plugins: [],
};

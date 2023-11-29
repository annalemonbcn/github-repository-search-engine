const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./node_modules/@nextui-org/theme/dist/components/button.js"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#0e1116",
        "custom-green": "#055d20",
        "custom-darkGreen": "#013D14",
        "custom-blue": "#0349b4",
        "custom-lightBlue": "#dff7ff",
        "custom-lightGray": "#e7ecf0",
        "custom-darkGray": "#ced5dc",
      },
    },
  },
  plugins: [nextui()],
}


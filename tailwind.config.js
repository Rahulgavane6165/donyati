/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'flip-fast': 'flip 0.7s ease-in-out',
        'flip-slow': 'flip 0.8s ease-in-out', 
      },
      colors: {
        white: "#fff",
        darkslategray: "#3c3757",
        whitesmoke: "#f5f5f5",
        skyblue: "#88d2f2",
        limegreen: "#80e442",
        black: "#000",
        steelblue: "#6775a8",
        yellowgreen: {
          "100": "#98ed64",
          "200": "#a1c13a",
        },
        white: "#fff",
        darkslategray: "#3c3757",
        whitesmoke: "#f5f5f5",
        darkslateblue: {
          "100": "#6d639d",
          "200": "#453f63",
        },
        gainsboro: "#e4d7d7",
      },
      spacing: {},
      fontFamily: {
        gidugu: "Gidugu",
        inter: "Inter",
      },
      borderRadius: {
        "81xl": "100px",
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'small':'100px',
    }
  },
  plugins: [],
};

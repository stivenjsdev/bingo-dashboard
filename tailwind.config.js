/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Condensed", "sans-serif"], // 'sans' es el valor predeterminado para Tailwind
        protestGuerrilla: ["Protest Guerrilla", "sans-serif"],
        sofadiOne: ["Sofadi One", "system-ui", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        robotoCondensed: ["Roboto Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};

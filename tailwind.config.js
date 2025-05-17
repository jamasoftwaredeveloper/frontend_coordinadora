// tailwind.config.js
import tailwindForms from "@tailwindcss/forms";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindForms],
};
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1063AC',
      },
    },
  },
  // ...
}
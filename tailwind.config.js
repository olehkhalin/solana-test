/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "button-gradient": "linear-gradient(60deg, #D32BF2 0%, #10D9BB 50%)",
      },
      boxShadow: {
        buttonsecondary: "0px 4px 15px rgba(204, 214, 255, 0.07)",
      },
    },
  },
  plugins: [],
};

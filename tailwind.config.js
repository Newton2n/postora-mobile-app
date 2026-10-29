/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: "#2563eb",
        ink: "#0f172a",
        muted: "#64748b",
        canvas: "#f4f7fb",
      },
    },
  },
  plugins: [],
};

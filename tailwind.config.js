/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
            },
            fontFamily: {
                montserrat: ["var(--font-montserrat)", "sans-serif"],
                poppins: ["var(--font-poppins)", "sans-serif"],
                babylonica: ["var(--font-babylonica)", "cursive"],
            },
        }
    },
    plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blood: {
                    900: "#0f0606",
                    800: "#200b0b",
                    700: "#2f0000",
                    600: "#490000",
                    500: "#650000",
                },
            },
        },
    },
    plugins: [],
};

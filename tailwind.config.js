export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // tell Tailwind where to scan for classes
    ],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['"Playfair Display"', "serif"],
                ropa: ['"Ropa Sans"', "sans-serif"],
            },
        },
    },
    plugins: [],
};

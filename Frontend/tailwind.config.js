export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // tell Tailwind where to scan for classes
    ],
    theme: {
        extend: {
            colors: {
                "dark-bg": "#1a1a1a",
                "dark-secondary": "#2a2a2a",
                "dark-tertiary": "#212121",
                "dark-text": "#e0e0e0",
                "dark-text-secondary": "#a0a0a0",
                "dark-border": "#404040",
                accent: "#3b82f6",
            },
            fontSize: {
                "5xl": "3rem",
                "custom-xl": "2.5rem",
            },
        },
    },
    plugins: [],
};

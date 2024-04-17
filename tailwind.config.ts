import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#4344bc",
                    dark: "#5356FF",
                    light: "#9495ee",
                },
                secondary: {
                    DEFAULT: "#54c0e1",
                    dark: "#378CE7",
                    light: "#8dd0e4",
                },
                background: {
                    DEFAULT: "#eaeaea", //ededef //f8f9fa
                    light: "#f1f1f1",
                },
                text: {
                    DEFAULT: "#2f2f2f",
                    light: "#3f3f3f",
                    invert: "#f9f9fb",
                    inactive: "#929292",
                },
                border: {
                    DEFAULT: "#f1f1f1",
                },
                alert: {
                    error: "#f8d7da",
                    success: "#d4edda",
                },
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeOut: {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
                scaleIn: {
                    "0%": { transform: "scale(.94)" },
                    "100%": { transform: "scale(1)" },
                },
                scaleOut: {
                    "0%": { transform: "scale(1)" },
                    "100%": { transform: "scale(.94)" },
                },
            },
            animation: {
                fadeIn: "fadeIn 0.1s ease forwards",
                scaleIn: "scaleIn 0.1s ease forwards",
            },
        },
    },
    plugins: [],
};
export default config;

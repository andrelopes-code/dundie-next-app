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
          DEFAULT: '#5356FF',
          dark: '#4344bc',
          light: '#9495ee',
        },
        secondary: {
          DEFAULT: '#54c0e1',
          dark: '#378CE7',
          light: '#8dd0e4',
        },
        background: {
          DEFAULT: '#f1f1f3', //ededef //f8f9fa 
          light: '#f8f9fa',
        },
        text: {
          DEFAULT: '#2a2a2a',
          light: '#3a3a3a',
          invert: '#f9f9fb',
        },
        border: {
          DEFAULT: '#f1f1f1',
        }
      },
    },
  },
  plugins: [],
};
export default config;

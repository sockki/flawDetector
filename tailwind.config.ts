import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    theme: {
      colors: {
        neutral: {
          100: '#030303',
          90: '#1a1a1a',
          80: '#333333',
          70: '#4d4d4d',
          60: '#4d4d4d',
          50: '#808080',
          40: '#999999',
          30: '#b3b3b3',
          20: '#cccccc',
          10: '#e6e6e6',
          5: '#f3f3f3',
        },
        primary: {
          500: '#6100ff',
          400: '#883eff',
          300: '#a66fff',
          200: '#c9a8ff',
          100: '#e0ceff',
          50: '#f2ebff',
        },
        system: {
          warning: '#ff6d6d',
          assist: '#6db0ff',
          suggest: '#ffd542',
          success: '#00c308',
        },
        'stroke-blue': '#99bdff',
        'purple-light': '#faf8ff',
        'purple-dark': '#e3e1e7',
        'red-light': '#ffefef',
        'gray-light': '#f1f1f1',
        'gray-dark': '#c2c2c2',
      },
    },
  },
  plugins: [],
};
export default config;

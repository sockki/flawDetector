import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundOpacity: {
        8: '0.08',
        12: '0.12',
        16: '0.16',
      },
      boxShadow: {
        button: '0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.25)',
        drop: '0 0 2.48rem 0 rgba(0, 0, 0, 0.25);',
        chatbot: '0 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.12)',
      },
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
        'gray-default': '#969696',
        'gray-black': '#3F3F3F',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '600',
      },
      animation: {
        spin360: 'spin360 2s linear infinite',
      },
      keyframes: {
        spin360: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

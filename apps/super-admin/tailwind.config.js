const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f2f4f6',
          200: '#eaecf0',
          300: '#d0d5dd',
          400: '#98a2b3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1d2939',
          900: '#101828',
        },
        primary: {
          DEFAULT: '#0036B1',
          light: '#2A50D7',
          dark: '#002985',
          50: '#E6ECFC',
          100: '#fbfbff',
          200: '#99B4F1',
        },
        success: {
          lighter: '#ECFDF3',
          light: '#ABEFC6',
          DEFAULT: '#ECFDF3',
        },
        warning: {
          lighter: '#FFFAEB',
          light: '#FEDF89',
          DEFAULT: '#B54708',
        },
        error: {
          lighter: '#FEF3F2',
          light: '#FECDCA',
          DEFAULT: '#B42318',
        },
      },
    },
  },
  plugins: [],
};

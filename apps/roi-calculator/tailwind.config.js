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
        'primary-color': '#04d',
        'secondary-color': '#17B26A',
        'gray':{
          DEFAULT : '#5D6B98',
          '800' : '#30374F',
          '700' : '#344054',
          '600' : '#475467',
          '400' : '#98A2B3',
        },
      }
    },
  },
  plugins: [],
};
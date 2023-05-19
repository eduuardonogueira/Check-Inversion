/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'conexao': 'auto, 1fr, auto'
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        asphalt: {
          950: '#0d0e10',
          900: '#16181b',
          800: '#212327',
          700: '#2e3136',
          600: '#43474d',
          500: '#5b6067',
          400: '#7d828a',
          300: '#a4a8ae',
          200: '#c9ccd0',
          100: '#e8e9eb',
          50: '#f5f5f6',
        },
        hazard: {
          600: '#c2410c',
          500: '#ea580c',
          400: '#f97316',
          300: '#fb923c',
        },
        signal: {
          go: '#16a34a',
          caution: '#eab308',
          stop: '#dc2626',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

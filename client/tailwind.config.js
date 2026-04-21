/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#020617',
        panel: '#0f172a',
        edge: '#1e293b',
        accent: '#22d3ee',
        glow: '#34d399',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.45)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

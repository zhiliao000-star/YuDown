/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-overlay': 'var(--bg-overlay)',
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        'surface-soft': 'var(--surface-soft)',
        fg: 'var(--fg)',
        'fg-soft': 'var(--fg-soft)',
        muted: 'var(--muted)',
        'muted-dim': 'var(--muted-dim)',
        'border-soft': 'var(--border-soft)',
        'border-strong': 'var(--border-strong)',
        'accent-soft': 'var(--accent-soft)',
        'accent-strong': 'var(--accent-strong)',
        'accent-glow': 'var(--accent-glow)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        glow: 'var(--shadow-glow)',
      }
    },
  },
  plugins: [],
};

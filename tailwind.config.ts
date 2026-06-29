import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        tile: 'var(--tile)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        accent: 'var(--accent)',
      },
      borderRadius: {
        bento: '24px',
      },
      boxShadow: {
        tile: '0 1px 2px rgba(0,0,0,0.04)',
        'tile-hover': '0 20px 40px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Inter',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config

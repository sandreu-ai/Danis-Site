import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './emails/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF8',
        linen: '#F4F1EE',
        sage: {
          DEFAULT: '#8FAE8B',
          dark: '#6B8F67',
          light: '#C0D4BD',
        },
        blush: {
          DEFAULT: '#C9A49C',
          dark: '#A87E77',
          light: '#EDD8D4',
        },
        stone: '#8A8178',
        charcoal: {
          DEFAULT: '#1C1C1C',
          light: '#5A5A5A',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        script: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      lineHeight: {
        body: '1.75',
      },
      maxWidth: {
        prose: '720px',
      },
      boxShadow: {
        card: '0 1px 8px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.09)',
      },
      borderRadius: {
        card: '4px',
      },
    },
  },
  plugins: [],
}

export default config

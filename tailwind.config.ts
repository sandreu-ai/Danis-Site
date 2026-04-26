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
        forest: '#2A3E2B',
        sage: {
          DEFAULT: '#4A8C4E',
          dark: '#3A7040',
          light: '#C8E6C9',
        },
        sun: '#F5C430',
        peach: '#F4956A',
        sky: '#89C4D4',
        cream: '#F6FAF4',
        linen: '#EDF5E1',
        stone: '#8A9E8B',
        charcoal: {
          DEFAULT: '#2A3E2B',
          light: '#8A9E8B',
        },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-fredoka)', 'system-ui', 'sans-serif'],
        script: ['var(--font-caveat)', 'cursive'],
      },
      lineHeight: {
        body: '1.75',
      },
      maxWidth: {
        prose: '720px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(42,62,43,0.08)',
        'card-hover': '0 8px 40px rgba(42,62,43,0.15)',
      },
      borderRadius: {
        card: '16px',
      },
      height: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
}

export default config

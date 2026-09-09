/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f7a8d8',
          400: '#f172be',
          500: '#e41e94', // Main brand color requested (#e41e94)
          600: '#cb137b',
          700: '#a70d62',
          800: '#8b0e51',
          900: '#731045',
          950: '#470227',
        },
        rose: {
          soft: '#fdf8f9',
          card: '#ffffff',
          accent: '#fff0f6',
        },
        warm: {
          50: '#faf8f6',
          100: '#f4efe9',
          200: '#e8ded4',
          700: '#5a4a57',
          800: '#3e323b',
          900: '#261f25',
        }
      },
      fontFamily: {
        heading: ['var(--font-heebo)', 'sans-serif'],
        body: ['var(--font-redhat)', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(228, 30, 148, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 10px 30px -4px rgba(228, 30, 148, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'card': '0 2px 12px 0 rgba(90, 74, 87, 0.05)',
      }
    },
  },
  plugins: [],
}

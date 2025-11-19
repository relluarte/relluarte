/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        tertiary: 'var(--color-tertiary)',
        surface: 'var(--color-surface)',
        background: 'var(--color-background)',
        'background-secondary': 'var(--color-background-secondary)',
        'background-tertiary': 'var(--color-background-tertiary)',
        'background-pastel-1': 'var(--color-background-pastel-1)',
        'background-pastel-2': 'var(--color-background-pastel-2)',
        'background-pastel-3': 'var(--color-background-pastel-3)',
        'background-pastel-4': 'var(--color-background-pastel-4)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
        border: 'var(--color-border)',
        'border-secondary': 'var(--color-border-secondary)',
        hover: 'var(--color-hover)',
        active: 'var(--color-active)',
        focus: 'var(--color-focus)',
        card: 'var(--color-card)',
        'card-hover': 'var(--color-card-hover)',
        input: 'var(--color-input)',
        'input-border': 'var(--color-input-border)',
        'input-focus': 'var(--color-input-focus)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-glass': 'var(--gradient-glass)',
      },
      ringColor: {
        accent: 'var(--color-accent)',
      },
      borderColor: {
        secondary: 'var(--color-border-secondary)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 3s ease infinite',
        shimmer: 'shimmer 2s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.bg-gradient-primary': {
          background: 'var(--gradient-primary)',
        },
        '.bg-gradient-secondary': {
          background: 'var(--gradient-secondary)',
        },
        '.bg-gradient-accent': {
          background: 'var(--gradient-accent)',
        },
        '.bg-gradient-glass': {
          background: 'var(--gradient-glass)',
        },
        '.shadow-glow': {
          boxShadow: 'var(--shadow-glow)',
        },
        '.text-gradient': {
          background: 'var(--gradient-primary)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
      });
    },
  ],
}
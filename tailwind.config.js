import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b2545',
        secondary: '#2563eb',
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        textPrimary: '#1E293B',
        textSecondary: '#64748B',
        borderC: '#E2E8F0',
        // Shade tambahan (tidak ada di palet default Tailwind)
        slate: {
          150: '#e9eef5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      // Token di bawah ini bawaan Tailwind v4, didefinisikan manual agar berfungsi di Tailwind v3
      spacing: {
        '5.5': '1.375rem',
      },
      ringWidth: {
        '3': '3px',
      },
      scale: {
        '130': '1.3',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        '2xs': '0 1px 0 0 rgba(11, 37, 69, 0.05)',
        'xs': '0 1px 2px 0 rgba(11, 37, 69, 0.06)',
        'sm': '0 4px 12px 0 rgba(11, 37, 69, 0.05)',
        'md': '0 10px 24px -4px rgba(11, 37, 69, 0.12), 0 4px 8px -2px rgba(11, 37, 69, 0.08)',
        'lg': '0 20px 40px -8px rgba(11, 37, 69, 0.15), 0 12px 16px -4px rgba(11, 37, 69, 0.1)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'fab': '0 8px 24px rgba(37, 99, 235, 0.6)',
        'fab-hover': '0 12px 28px rgba(37, 99, 235, 0.8)',
        'bottom-nav': '0 -4px 20px rgba(0, 0, 0, 0.06)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'service-lapor': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'service-siphp': 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
        'service-cuaca': 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
        'service-jdih': 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseFab: {
          '0%': { boxShadow: '0 0 0 0 rgba(37, 99, 235, 0.6)' },
          '70%': { boxShadow: '0 0 0 25px rgba(37, 99, 235, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)' },
        }
      },
      animation: {
        // fill-mode "both": elemen tetap transparan selama animation-delay (tidak berkedip)
        'fade-in': 'fadeIn 0.25s ease-out both',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-fab': 'pulseFab 2.5s infinite',
      }
    },
  },
  plugins: [
    // Utility animate-delay-* (delay-* bawaan Tailwind hanya untuk transition, bukan animation)
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        { 'animate-delay': (value) => ({ animationDelay: value }) },
        { values: theme('transitionDelay') }
      );
    }),
  ],
}

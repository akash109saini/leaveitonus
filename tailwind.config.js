/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0B0C',
          surface: '#121214',
          card: '#161619',
          border: '#222226',
          yellow: '#FFE300',
          yellowHover: '#FFEB3B',
          gold: '#F5E6C8',
          textMuted: '#8E8E93',
          textSec: '#A1A1AA',
          textHead: '#FFFFFF',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'marquee-slow': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', filter: 'blur(30px)' },
          '50%': { opacity: '0.7', filter: 'blur(45px)' },
        }
      }
    },
  },
  plugins: [],
}

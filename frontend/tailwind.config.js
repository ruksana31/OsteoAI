/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0f1e",
        foreground: "#f0ece3",
        card: {
          DEFAULT: "rgba(10, 15, 30, 0.6)",
          foreground: "#f0ece3"
        },
        popover: {
          DEFAULT: "#0a0f1e",
          foreground: "#f0ece3"
        },
        primary: {
          DEFAULT: "#00e5ff",
          foreground: "#000000"
        },
        secondary: {
          DEFAULT: "#1B2436",
          foreground: "#00e5ff"
        },
        accent: {
          DEFAULT: "#00e5ff",
          foreground: "#000000"
        },
        destructive: {
          DEFAULT: "#ff4d6d",
          foreground: "#ffffff"
        },
        success: "#06d6a0",
        warning: "#ffd166",
        info: "#00e5ff",
        border: "rgba(0, 229, 255, 0.2)",
        input: "rgba(0, 0, 0, 0.2)",
        ring: "#00e5ff",
        chart: {
          1: "#00e5ff",
          2: "#06d6a0",
          3: "#ff4d6d",
          4: "#ffd166",
          5: "#f0ece3"
        }
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace']
      },
      borderRadius: {
        lg: "2rem",
        md: "1rem",
        sm: "0.5rem"
      },
      keyframes: {
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        pulse: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        },
        scanBeam: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' }
        },
        flipCard: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' }
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        fadeSlideUp: 'fadeSlideUp 0.5s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        scanBeam: 'scanBeam 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
        shake: 'shake 0.3s ease-in-out',
        flipCard: 'flipCard 0.6s ease-in-out',
        countUp: 'countUp 0.5s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}

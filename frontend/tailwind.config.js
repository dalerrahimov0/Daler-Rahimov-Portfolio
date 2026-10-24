/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono2: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        // Portfolio theme tokens — values live in src/index.css (:root is dark,
        // [data-theme="light"] overrides). Prefer these over raw zinc/white/hex.
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          sunken: 'var(--surface-sunken)'
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          strong: 'rgb(var(--ink-strong) / <alpha-value>)',
          body: 'rgb(var(--ink-body) / <alpha-value>)',
          soft: 'rgb(var(--ink-soft) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--ink-faint) / <alpha-value>)',
          ghost: 'rgb(var(--ink-ghost) / <alpha-value>)',
          numeral: 'rgb(var(--ink-numeral) / <alpha-value>)'
        },
        edge: {
          DEFAULT: 'var(--edge)',
          subtle: 'var(--edge-subtle)',
          strong: 'var(--edge-strong)',
          control: 'var(--edge-control)',
          'control-hover': 'var(--edge-control-hover)'
        },
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          soft: 'var(--brand-soft)'
        },
        gold: {
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          hover: 'rgb(var(--gold-hover) / <alpha-value>)',
          ink: 'rgb(var(--gold-ink) / <alpha-value>)',
          edge: 'var(--gold-edge)'
        },
        inverse: {
          DEFAULT: 'rgb(var(--inverse) / <alpha-value>)',
          ink: 'rgb(var(--inverse-ink) / <alpha-value>)',
          hover: 'rgb(var(--inverse-hover) / <alpha-value>)'
        },
        nav: 'var(--nav-bg)',
        wash: 'var(--wash)',
        scrim: 'var(--scrim)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      // Brand used as TEXT resolves to --brand-ink (a touch lighter in dark for
      // AA); bg/border/fill utilities keep the exact --brand from `colors`.
      textColor: {
        brand: {
          DEFAULT: 'rgb(var(--brand-ink) / <alpha-value>)',
          soft: 'var(--brand-soft)'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // CAE Brand Colors
        ind: "#2E2567",   // Dark Indigo — primary brand
        pur: "#644A9E",   // Purple — secondary
        yel: "#FBD207",   // Yellow — accent/CTA
        amb: "#F59E0B",   // Amber — warm accent
        dk:  "#1A1840",   // Dark Navy — dark backgrounds
        wa:  "#25D366",   // WhatsApp green
        bdr: "#E2E0F0",   // Border color
        // shadcn/ui tokens — use var() directly since CSS vars are already full oklch() values
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
        hindi: ["var(--font-hindi)", "Noto Sans Devanagari", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        brand: "14px",
      },
      maxWidth: {
        brand: "1240px",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--accordion-panel-height, auto)" },
        },
        "accordion-up": {
          from: { height: "var(--accordion-panel-height, auto)" },
          to:   { height: "0" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Replaces @custom-variant directives from shadcn/tailwind.css (Tailwind v4 syntax)
    // These are required for @base-ui/react components to apply state-based styles
    plugin(({ addVariant }) => {
      addVariant("data-open",       ['&[data-state="open"]',    '&[data-open]:not([data-open="false"])'])
      addVariant("data-closed",     ['&[data-state="closed"]',  '&[data-closed]:not([data-closed="false"])'])
      addVariant("data-active",     ['&[data-state="active"]',  '&[data-active]:not([data-active="false"])'])
      addVariant("data-checked",    ['&[data-state="checked"]', '&[data-checked]:not([data-checked="false"])'])
      addVariant("data-unchecked",  ['&[data-state="unchecked"]'])
      addVariant("data-disabled",   ['&[data-disabled="true"]', '&[data-disabled]:not([data-disabled="false"])'])
      addVariant("data-selected",   ['&[data-selected="true"]'])
      addVariant("data-horizontal", ['&[data-orientation="horizontal"]'])
      addVariant("data-vertical",   ['&[data-orientation="vertical"]'])
      addVariant("not-last",        '&:not(:last-child)')
      addVariant("starting",        '@starting-style')
      addVariant("ending",          '&[data-ending-style]')
    }),
  ],
};
export default config;

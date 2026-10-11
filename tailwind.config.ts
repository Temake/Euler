import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom Theme Tokens (Purple Primary)
        brand: {
          primary: "#7c3aed",
          "primary-bright": "#8b5cf6",
          "primary-deep": "#5b21b6",
          "primary-tint": "#f3e8ff",
          "on-primary": "#ffffff",
          ink: "#100f3e",
          "ink-soft": "#777777",
          "on-ink": "#ffffff",
          canvas: "#ffffff",
          paper: "#ffffff",
          cloud: "#ddf4ff",
          hairline: "#e5e5e5",
          link: "#1cb0f6",
          "link-pressed": "#026cb2",
          warning: "#ff9600",
          "warning-deep": "#e58500",
          error: "#ff4b4b",
          "error-deep": "#ea2b2b",
          "accent-super": "#00c0ff",
        },
        primary: {
          DEFAULT: "#7c3aed",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ddf4ff",
          foreground: "#1cb0f6",
        },
        muted: {
          DEFAULT: "#f7f7f7",
          foreground: "#777777",
        },
        accent: {
          DEFAULT: "#1cb0f6",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ff4b4b",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#100f3e",
        },
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#7c3aed",
      },
      fontFamily: {
        sans: ["Nunito", "ui-rounded", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        pill: "9999px",
      },
      boxShadow: {
        "button-primary": "0 4px 0 #5b21b6",
        "button-primary-hover": "0 6px 0 #5b21b6",
        "button-primary-active": "0 2px 0 #5b21b6",
        "button-secondary": "0 2px 0 #e5e5e5",
        "button-secondary-hover": "0 4px 0 #e5e5e5",
        "button-blue": "0 4px 0 #1899d6",
        "button-warning": "0 4px 0 #e58500",
        "button-danger": "0 4px 0 #ea2b2b",
        card: "0 4px 0 #e5e5e5",
        "card-selected": "0 4px 0 #7c3aed",
        "card-success": "0 4px 0 #5b21b6",
        "card-error": "0 4px 0 #ea2b2b",
      },
    },
  },
  plugins: [],
};

export default config;

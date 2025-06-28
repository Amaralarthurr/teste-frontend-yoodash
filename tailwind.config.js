/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Cores principais do site
        primary: {
          DEFAULT: "#ff1510",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ff1510",
          600: "#e6130e",
          700: "#cc110d",
          800: "#b30f0b",
          900: "#990d09",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#e7f6e7",
          50: "#f0fdf4",
          100: "#e7f6e7",
          200: "#d1edd1",
          300: "#bbe4bb",
          400: "#a5dba5",
          500: "#8fd28f",
          600: "#79c979",
          700: "#63c063",
          800: "#4db74d",
          900: "#37ae37",
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#fdecec",
          50: "#fefefe",
          100: "#fdecec",
          200: "#fbd9d9",
          300: "#f9c6c6",
          400: "#f7b3b3",
          500: "#f5a0a0",
          600: "#f38d8d",
          700: "#f17a7a",
          800: "#ef6767",
          900: "#ed5454",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Tons de cinza customizados
        gray: {
          50: "#f9f9f9",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#b9b9b9",
          500: "#8c8c8c",
          600: "#404040",
          700: "#363636",
          800: "#2c2c2c",
          900: "#222222",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}

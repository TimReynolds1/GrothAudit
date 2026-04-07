import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#f5f0e8",
        ink: "#2f2923",
        tan: {
          50: "#f8f1e8",
          100: "#f0e2cf",
          200: "#e4c9a2",
          300: "#d9b785",
          500: "#C49D68",
          600: "#b38c58",
          700: "#8f6f45",
          900: "#5f4830"
        },
        navy: {
          50: "#f4f1ed",
          100: "#e4ddd4",
          500: "#766557",
          600: "#665647",
          700: "#504439",
          900: "#332a24"
        },
        slate: {
          50: "#faf8f5",
          100: "#f1ece5",
          200: "#e1d7ca",
          400: "#988d80",
          500: "#7b7066",
          700: "#524a43",
          900: "#2f2923"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(61, 45, 29, 0.08)",
        card: "0 10px 30px rgba(61, 45, 29, 0.08)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(196, 157, 104, 0.16), transparent 38%), radial-gradient(circle at top right, rgba(143, 111, 69, 0.1), transparent 32%)"
      }
    }
  },
  plugins: []
};

export default config;

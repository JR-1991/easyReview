/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require('tailwindcss-bg-patterns')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "night", "corporate"],
  },
  patterns: {
    opacities: {
      100: "1",
      80: ".80",
      60: ".60",
      40: ".40",
      20: ".20",
      10: ".10",
      5: ".05",
    },
    sizes: {
      1: "0.25rem",
      2: "0.5rem",
      4: "1rem",
      6: "1.5rem",
      8: "2rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem",
    }
  }
}
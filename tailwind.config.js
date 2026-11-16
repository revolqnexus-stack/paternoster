/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#faf8f5',
        'warm-white': '#f5f3f0',
        charcoal: '#2a2a2a',
        'soft-black': '#1a1a1a',
        burgundy: '#8b3a3a',
        'burgundy-light': '#a04848',
        sage: '#9ca89c',
        cream: '#ebe8e3',
        'border-subtle': '#e5e3df',
      },
      fontFamily: {
        heading: ['Crimson Text', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        'prose': '65ch',
        'container': '1400px',
      },
    },
  },
  plugins: [],
};

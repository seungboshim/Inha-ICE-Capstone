import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary : '#0094FF',
        brightgrey: '#F9F9F9',
        lightgrey: '#E5E5E5',
        semigrey: '#C8C8C8',
        grey: '#A3A3A3',
        kakaoyellow: '#FAE100',
        kakaodark: '#262626',
        approve: '#27AE60',
        warning: '#EB5757',
        male: '#004E7A',
        female: '#EE89A1',
        truedata: '#FFBF00'
      }
    },
  },
  plugins: [],
}
export default config

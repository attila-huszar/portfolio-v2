import type { Config } from 'prettier'

const config = {
  endOfLine: 'lf',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
} satisfies Config

export default config

/** @type {import("prettier").Config} */
const config = {
  endOfLine: 'lf',
  tabWidth: 2,
  semi: false,
  bracketSameLine: true,
  trailingComma: 'all',
  singleQuote: true,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config

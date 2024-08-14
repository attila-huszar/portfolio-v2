/** @type {import("prettier").Config} */
const config = {
  plugins: ['eslint-plugin-tailwindcss'],
  endOfLine: 'lf',
  tabWidth: 2,
  semi: false,
  bracketSameLine: true,
  trailingComma: 'all',
  singleQuote: true,
  arrowParens: 'avoid',
}

export default config

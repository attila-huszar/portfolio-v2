import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  ...compat.config({
    extends: ['eslint:recommended', 'next/typescript'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'warn',
    },
    parserOptions: {
      project: true,
    },
    ignorePatterns: ['node_modules', '.next', 'out', '*.mjs'],
  }),
]

export default eslintConfig

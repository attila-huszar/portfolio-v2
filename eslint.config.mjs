// @ts-check
import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import tailwind from 'eslint-plugin-tailwindcss'

// NOTE: This is a workaround for ESLint plugins that have not been updated to use the new ESLint 9 flat config format.
// See https://github.com/vercel/next.js/issues/64409
function fixCompatibility(...configNames) {
  return new FlatCompat().extends(...configNames).map(entry => {
    const plugins = entry.plugins
    for (const key in plugins) {
      // eslint-disable-next-line no-prototype-builtins
      if (plugins.hasOwnProperty(key)) {
        plugins[key] = fixupPluginRules(plugins[key])
      }
    }
    return entry
  })
}

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tailwind.configs['flat/recommended'],
  prettierConfig,
  /**
   * If you want to add other ESLint configs / plugins:
   * - either add its ESLint 9 flat config before this comment
   * - or if they don't support it yet, add the name you'd put in the .eslintrc.json to the `fixCompatibility` call
   */
  ...fixCompatibility('next'),
  {
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
  {
    files: [
      'next.config.mjs',
      'eslint.config.mjs',
      'prettier.config.mjs',
      'postcss.config.js',
    ],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: [
      '.next/**/*',
      'node_modules/**/*',
      'dist/**/*',
      'build/**/*',
      'coverage/**/*',
    ],
  },
)
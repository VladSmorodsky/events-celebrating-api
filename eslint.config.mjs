// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Global ignores (replacement for .eslintignore)
  // Put this first so it applies to everything
  { ignores: ['dist/', 'build/', 'coverage/', 'node_modules/', '.husky/', '.vscode/'] },

  // Base JS rules for all files
  {
    name: 'base-js',
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    extends: [js.configs.recommended],
  },

  // TypeScript (no type-check rules — fast)
  // If you want type-aware rules, see the next block.
  {
    name: 'ts-untyped',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
      globals: { ...globals.node },
    },
    extends: [
      ...tseslint.configs.recommended,
      // stylistic (optional): consistent TS style that doesn't fight Prettier
      ...tseslint.configs.stylistic,
      // make ESLint not fight Prettier
      prettier,
    ],
    rules: {
      // add your tweaks here
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    },
  },

  // OPTIONAL: turn on **type-aware** rules (stricter, slower)
  // Comment out if you don’t need this.
  {
    name: 'ts-typechecked',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    extends: [...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked, prettier],
  },
);

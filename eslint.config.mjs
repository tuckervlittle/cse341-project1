import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
// import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 'latest',
    },
    rules: {
      'no-console': 'off',
      quotes: ['error', 'single'],
    },
  },
]);

import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import jest from 'eslint-plugin-jest';

export default [
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      jest: jest,
      'simple-import-sort': simpleImportSort,
      prettier: prettier,
    },
    rules: {
      ...jest.configs['flat/recommended'].rules,
      ...importPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];

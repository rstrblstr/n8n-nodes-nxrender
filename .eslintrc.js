/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	root: true,
  
	env: {
	  browser: true,
	  es6: true,
	  node: true,
	},
  
	parser: '@typescript-eslint/parser',
  
	parserOptions: {
	  //project: ['./tsconfig.json'],
	  //tsconfigRootDir: __dirname,
	  tsconfigRootDir: './',
	  sourceType: 'module',
	  extraFileExtensions: ['.json'],
	},
  
	ignorePatterns: ['.eslintrc.js', '**/node_modules/**', '**/dist/**', '**/*.js', '**/*.d.ts', 'tsconfig.json'], 
  
	plugins: ['@typescript-eslint', 'eslint-plugin-n8n-nodes-base'],
  
	extends: [
	  'eslint:recommended',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:n8n-nodes-base/community',
	  'plugin:n8n-nodes-base/credentials',
	  'plugin:n8n-nodes-base/nodes',
	],
  
	rules: {
	  'quotes': ['error', 'single', { 'avoidEscape': true }],
	  'semi': ['error', 'always'],
	  'indent': ['error', 2],
	  'no-trailing-spaces': 'error',
	  'eol-last': ['error', 'always'],
	  'no-unused-vars': 'off',
	  '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
	  '@typescript-eslint/explicit-function-return-type': ['error', { 'allowExpressions': true }],
	  '@typescript-eslint/no-explicit-any': 'error',
	  '@typescript-eslint/no-non-null-assertion': 'error',
	  '@typescript-eslint/no-inferrable-types': 'error',
	  '@typescript-eslint/consistent-type-assertions': 'error',
	  '@typescript-eslint/explicit-module-boundary-types': 'off',
	  '@typescript-eslint/no-empty-function': 'off',
	  'comma-dangle': ['error', 'always-multiline'],
	  'no-console': 'warn',
	  'curly': 'error',
	  'n8n-nodes-base/community-package-json-name-still-default': 'off',
	  'n8n-nodes-base/cred-class-field-documentation-url-missing': 'off',
	  'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
	  'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'off',
	  'n8n-nodes-base/node-resource-description-filename-against-convention': 'off',
	  'n8n-nodes-base/node-param-fixed-collection-type-unsorted-items': 'off',
	},
  };
  
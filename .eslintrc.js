module.exports = {
	root: true,
	env: {
		node: true,
		es2019: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'n8n-nodes-base'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'no-console': 'off',
		'semi': ['error', 'always'],
		'quotes': ['error', 'single', { avoidEscape: true }],
		'comma-dangle': ['error', 'always-multiline'],
		'indent': ['error', 'tab'],
		'no-tabs': 'off',
	},
	ignorePatterns: [
		'node_modules/',
		'dist/',
		'*.js',
		'gulpfile.js',
		'test/',
	],
};

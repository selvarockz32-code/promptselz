import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];

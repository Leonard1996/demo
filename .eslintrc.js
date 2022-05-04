// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'template-curly-spacing': 'off',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    quotes: ['error', 'single'],
    'no-use-before-define': ['error', { variables: false }],
    // indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': 0,
    semi: ['error', 'always'],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
};

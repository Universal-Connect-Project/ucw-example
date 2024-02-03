module.exports = {
  root: true,
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  ignorePatterns: ["src/public/static/vue3.js"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
};
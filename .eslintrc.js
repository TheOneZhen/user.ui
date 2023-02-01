module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    // 'vue',
    // '@typescript-eslint'
  ],
  rules: {
    'no-unused-vars': 'off',
    'vue/no-multiple-template-root': 'off'
  }
}

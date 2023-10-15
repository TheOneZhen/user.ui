module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@vue/eslint-config-typescript',
    './.eslintrc-auto-import.json'
  ],
  rules: {
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'never'],
    'spaced-comment': ['warn', 'always'],
    'no-debugger': ['error'],
    'space-before-function-paren': ['warn'], // function到参数之间必须存在空格
    'block-spacing': ['warn', 'always'], // block俩端必须存在空格
    'comma-dangle': ['warn', 'never'], // 分段内容后不需要设置逗号
    'comma-spacing': ['warn', { 'before': false, 'after': true }], // 逗号后需要接空格
    'no-whitespace-before-property': ['warn'], // 属性调用符后不允许出现空格
    'no-trailing-spaces': ['warn'], // 每行后不允许出现空格
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    'no-restricted-syntax': [
      'error',
      // since we target ES2015 for baseline support, we need to forbid object
      // rest spread usage in destructure as it compiles into a verbose helper.
      'ObjectPattern > RestElement',
      // tsc compiles assignment spread into Object.assign() calls, but esbuild
      // still generates verbose helpers, so spread assignment is also prohiboted
      'ObjectExpression > SpreadElement'
    ]
  },
  overrides: []
}

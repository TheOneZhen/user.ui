module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    app: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion':'off',
    'prefer-spread': 'off',
    'vue/no-unused-components': 'warn',
    'prefer-const': 'off',
    'prefer-rest-params': 'off',
    'prefer-rest-params': 'off',
    'no-irregular-whitespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    'no-prototype-builtins': 'off',
    'vue/no-unused-components': 'warn',
    'vue/no-unused-vars': 'warn',

    'vue/html-indent': ['warn', 2],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 4, // 一行最多四个
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/require-default-prop': 0, // 可以不传递props
    'vue/name-property-casing': ['warn', 'kebab-case'],
    'vue/no-template-shadow': 0,
    'vue/no-unused-components': 0,
    'vue/attributes-order': 'warn',
    'vue/order-in-components': 'warn',
    'vue/html-self-closing': 0, // airbnb
    'comma-dangle': [
      'warn',
      {
        arrays: 'never',
        objects: 'ignore',
        imports: 'never',
        exports: 'never',
        functions: 'ignore',
      },
    ],
    camelcase: 0,
    'dot-notation': 0,
    'new-parens': ['warn'],
    'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          // ["+", "-", "*", "/", "%", "**"],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'object-curly-newline': 0, // { a, b, c } 允许不换行
    'arrow-body-style': 0, // a => 1
    'arrow-parens': 0, // a => 1
    'quote-props': 0, // "a-1": 2
    'guard-for-in': 0, // xx.hasOwnProperty(key)
    'no-restricted-syntax': 0,
    'global-require': 0,
    eqeqeq: 0,
    'no-plusplus': 0,
    'no-unused-expressions': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    // "import/no-extraneous-dependencies": 0,
    // "import/prefer-default-export": 0,
    // "import/newline-after-import": ["warn"],
    // "import/first": 0,
    // "import/no-unresolved": 0,
    // "import/extensions": 0,
    'no-restricted-globals': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-useless-return': 0,
    'prefer-const': 0,
    'no-else-return': 0,
    'func-names': 0,
    'prefer-arrow-callback': 0,
    'no-bitwise': 0,
    'padded-blocks': 0, // {} 允许空行
    'no-return-assign': 0,
    'max-len': ['warn', { code: 300, ignoreComments: true }],
    'prefer-destructuring': 0,
    'prefer-template': 0,
    'no-nested-ternary': 0,
    'prefer-rest-params': 0,
    'class-methods-use-this': 0,
    // tab缩进
    '@typescript-eslint/indent': ['warn', 2, { SwitchCase: 1 }],

    // "indent": ["warn", 2,
    // 	{
    // 		"SwitchCase": 1
    // 	}
    // ],
    'no-tabs': 0,
    quotes: 0,
    'no-console': 0,
    'no-var': 1,
    'import/named': 0,
    semi: [1, 'always'],
    'no-trailing-spaces': 0,
    'eol-last': 0,
    'no-underscore-dangle': 0,
    'no-alert': 0,
    'no-lone-blocks': 0,
    // 关键字周围强制使用空格
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    // 大括号中强制使用空格
    'object-curly-spacing': ['warn', 'always'],
    // 单行代码块前后要加空格
    'block-spacing': ['warn', 'always'],
    // 逗号后面加空格
    'comma-spacing': [
      'warn',
      {
        before: false,
        after: true,
      },
    ],
    // 分号后面加空格
    'semi-spacing': [
      'warn',
      {
        before: false,
        after: true,
      },
    ],
    // 在注释前有空白
    'spaced-comment': ['warn', 'always'],
    // 箭头函数前后要有空格
    'arrow-spacing': [
      'warn',
      {
        before: true,
        after: true,
      },
    ],
    // 对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': [
      'warn',
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    // 要求操作符周围有空格
    'space-infix-ops': [
      'warn',
      {
        int32Hint: false,
      },
    ],
    'jsx-quotes': 1,
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
      },
    ],
    'no-empty': 0,

    // allow debugger during development only
    'no-debugger': 'warn',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
}

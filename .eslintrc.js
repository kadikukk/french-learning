module.exports = {
    'parser': 'babel-eslint',
    'env': {
      'browser': true,
      'es6': true,
      'jest': true
    },
    'extends': 'react-app',
    'parserOptions': {
      'ecmaVersion': 8,
      'ecmaFeatures': {
        "jsx": true
      },
      'sourceType': 'module'
    },
    'plugins': [
      'react',
      'jsx-a11y',
      'import'
    ],
    'globals': {
      'DEVELOPMENT': false
    },
    'rules': {
      'strict': 0,
      'comma-dangle': [
        'warn',
        'never'
      ],
      'indent': [
        'warn',
        2,
        {
          'SwitchCase': 1
        }
      ],
      'linebreak-style': 0
      ,
      'quotes': [ 'warn', 'single' ],
      'semi': [ 'warn', 'always' ],
      'no-trailing-spaces': 1,
  
      'jsx-tag-spacing': 'off',
      'react/jsx-tag-spacing': 'off',
      'padded-blocks': 'off',
      'prefer-destructuring': 'off',
      'object-curly-newline': 'off',
      'function-paren-newline': 'off',
      /* Advanced Rules*/
      'no-unused-expressions': 'warn',
      'no-useless-concat': 'warn',
      'no-multi-spaces': 'warn',
      'block-scoped-var': 'error',
      'object-shorthand': 0,
  
      /* Ease some airbnb rules */
      'class-methods-use-this': 0,
      'arrow-parens': 'off',
      'arrow-body-style': 'off',
      'jsx-a11y/href-no-hash': 'off', //needed because not working correctly with newer node
      'jsx-a11y/anchor-is-valid': 'off',
      'prefer-template': 'off',
  
      /* Ease some react rules */
      'react/prop-types': [1, { ignore: ['routing', '.*Store'] }],
      'react/prefer-stateless-function': 'off',
      'react/forbid-prop-types': 'off',
      'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
      'react/no-unused-prop-types': 'warn',
      'react/jsx-no-bind': [2, {"allowBind": true, "allowArrowFunctions": true}],
      'react/destructuring-assignment': 0,
      'react/jsx-one-expression-per-line': 'off', //doesn't work on Windows
      'react/self-closing-comp': 1,
      'react/no-did-update-set-state': 0,
  
      'operator-linebreak': ["error", "after", { "overrides": { "?": "before", ":": "before" } }],
      'max-len': [1, 160, 2, { ignoreComments: true }],
      'quote-props': [1, 'consistent-as-needed'],
      'no-mixed-operators': 'off',
      'no-cond-assign': [2, 'except-parens'],
      'no-unused-vars': [1, { 'vars': 'local', 'args': 'none' }],
      'eqeqeq': ['error', 'smart'],
      'react/sort-comp': [1, {
        order: [
          'static-methods',
          'lifecycle',
          'everything-else',
          'rendering'
        ],
        groups: {
          rendering: [
            '/^render.+$/',
            'render'
          ]
        }
      }],
  
      'no-shadow': 1,
      'import/prefer-default-export': 0,
      'import/no-named-as-default': 0,
      'radix': ['error', 'as-needed'],
      'consistent-return': ['error', { 'treatUndefinedAsUnspecified': true }],
      'no-console': 'off',
      'no-bitwise': ['error', { 'allow': ['&='] }],
      'no-param-reassign': ['error', { 'props': false }],
      "jsx-a11y/click-events-have-key-events": "off", // should be enabled in the future
  
      'prefer-promise-reject-errors': 'off',
      'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
      'no-debugger': 1,
      'import/named': 1,
    }
  };
  
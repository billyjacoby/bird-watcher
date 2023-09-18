const internalPaths = [
  '@api',
  '@assets',
  '@env',
  '@components',
  '@hooks',
  '@icons',
  '@lib',
  '@navigation',
  '@screens',
  '@stores',
];

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks'],
  settings: {
    'import/ignore': [
      'node_modules/react-native/index\\.js$',
      'react-native-code-push',
    ],
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 1,
        'import/no-unresolved': [
          2,
          {
            ignore: [...internalPaths],
          },
        ],
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
            ],
            'newlines-between': 'always',
            pathGroups: [
              {
                pattern: 'react',
                group: 'builtin',
              },
              {
                pattern: 'react-dom',
                group: 'builtin',
              },
              {
                pattern: 'react-native',
                group: 'builtin',
              },
              {pattern: './*', group: 'internal'},
              ...internalPaths.map(path => ({
                pattern: path,
                group: 'internal',
              })),
            ],
            pathGroupsExcludedImportTypes: ['react', 'react-dom'],
          },
        ],
        quotes: ['warn', 'single', 'avoid-escape'],
        '@typescript-eslint/no-explicit-any': 'warn',
        'react/prop-types': 0,
        camelcase: [1],
        'no-console': [
          'error',
          {
            allow: ['error'],
          },
        ],
        'sort-imports': [
          'error',
          {
            ignoreCase: true,
            ignoreMemberSort: false,
            ignoreDeclarationSort: true,
          },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
};

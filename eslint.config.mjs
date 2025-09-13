import next from 'eslint-config-next';

export default [
  ...next,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            'core-js',
            'core-js/stable',
            'regenerator-runtime/runtime',
            'whatwg-fetch',
            'object-assign',
          ],
          patterns: ['react-app-polyfill/*'],
        },
      ],
    },
  },
];

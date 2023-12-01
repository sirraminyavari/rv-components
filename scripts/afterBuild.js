const replace = require('replace-in-file');

const options = {
  files: 'dist/*/**',
  from: /\.module\.scss\.(cjs|mjs)/g,
  to: '.module.scss',
};
(async () => {
  try {
    const results = await replace(options);
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

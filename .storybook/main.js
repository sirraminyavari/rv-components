const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpackFinal: async (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __IS_DEV__: process.env.NODE_ENV === 'development',
      })
    );

    // config.module.rules = [
    //   {
    //     test: /\.(woff|woff2|eot|ttf|svg)$/,
    //     use: [
    //       {
    //         loader: 'resolve-url-loader',
    //       },
    //     ],
    //   },
    //   ...config.module.rules,
    // ];

    return config;
  },
  stories: [
    '../stories/**/*.stories.@(ts|tsx|js|jsx|mdx)',
    '../stories/*.stories.@(ts|tsx|js|jsx|mdx)',
    '../src/**/*.stories.@(ts|tsx|js|jsx|mdx)',
  ],
  framework: '@storybook/react',
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: false, // type-check stories during Storybook build
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        return prop.parent
          ? prop.parent.name !== 'DOMAttributes' &&
              !prop.parent.name.includes('HTMLAttributes') &&
              prop.parent.name !== 'AriaAttributes'
          : true;
      },
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  rules: [
    // ...
    {
      test: /\.mdx?$/,
      use: ['babel-loader', '@mdx-js/loader'],
    },
  ],
};

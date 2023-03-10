import './storybook.scss';
// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  // docs: {
  //   source: {
  //     type: 'code',
  //   },
  // },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    options: {
      storySort: {
        order: [
          'Intro',
          'Install',
          'Usage',
          'ColorPalettes',
          'Iconography',
          'Components',
          'Demo',
        ],
      },
    },
  },
  // darkMode: {
  //   darkClass: 'dark',
  //   lightClass: 'default',
  //   stylePreview: true,
  //   classTarget: 'html',
  //   current: 'default',
  // },
  themes: {
    default: 'default',
    list: [
      {
        name: 'default',
        class: 'default',
        color: 'hsla(198, 63%, 38%, 1)',
        default: true,
      },
      { name: 'dark', class: 'dark', color: 'hsla(213, 24%, 16%, 1)' },
      { name: 'amoled', class: 'amoled', color: 'hsla(0, 0%, 0%, 1)' },
    ],
  },
  // layout: 'fullscreen',
};

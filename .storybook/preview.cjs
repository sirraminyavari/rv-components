import './storybook.scss';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    partialBundledLanguages: true,
    defaultNS: undefined,
    ns: ['common'],
    // the translations
    // resources: {
    //   en,
    // },

    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

/** @type { import('@storybook/react').Preview } */
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
        order: ['Intro', 'Install', 'Usage', 'ColorPalettes', 'Iconography', 'Components', 'Demo'],
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

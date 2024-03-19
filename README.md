# @cliqmind/rv-components

[![Version](https://img.shields.io/npm/v/@cliqmind/rv-components.svg)](https://www.npmjs.com/package/@cliqmind/rv-components)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)
[![License: UNLICENSED](https://img.shields.io/badge/License-UNLICENSED-yellow.svg)](#)

> Cliqmind UI framework

## Prerequisites

- node >=18.0.0
  - asd

## Usage

- Install the core package as production dependency via `yarn add @cliqmind/rv-components` command
- Install the needed peer dependencies as production/development dependencies:
  - development (needed for compiling the project before distribution): `yarn add -D sass style-inject tslib@^2.4 clsx`
  - production: `yarn add i18next@^23 @popperjs/core@^2.11 p-queue ramin-modern-calendar-datepicker react-animate-height react-modal react-loading-skeleton react-popper react-select@^5.7 react-toastify`

- install and configure the I18n in project by the instructions provided in [I18n setup](i18n-setup.md)

## Development and contributions

- To begin with development of the package:
  1. clone the `rv-components` repo.
  2. install the dependencies via `yarn install`.
  3. start storybook development server via `yarn storybook`.


- To build the package for distribution:
    1. remove the **dist** directory via `yarn build:clear-dist`.
    2. initiate the **es/cjs** compiling with rollup via `yarn build:rollup`.
    3. copy the required project assets (fonts/raw scss/images/etc.) via `yarn build:scss`.
    4. copy the main project files (package.json/readme/changelog) to the dist folder via `yarn postbuild`.
    - or just use the `yarn build` command :grin:.

The rv-components is compatible with **node 18** aka **LTS/hydrogen** engine.

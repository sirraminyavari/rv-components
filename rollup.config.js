import resolve from '@rollup/plugin-node-resolve';
import glob from 'glob';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

const entryPoints = [
  'src/index.ts',
  ...glob.sync('src/?(components|constants|hooks|icons|layouts|types|utils|views)/**/index.ts'),
];

/** @type {import('rollup').RollupOptions} */

const rollupConfig = [
  {
    input: entryPoints,
    output: {
      dir: 'dist',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].mjs',
    },

    external: [
      ...Object.keys({
        ...packageJson.peerDependencies,
        ...packageJson.dependencies,
      }),
    ],
    plugins: [
      resolve({ extensions: ['.ts', '.tsx', '.json'] }),
      peerDepsExternal(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist',
          outDir: 'dist',
        },
      }),
      // sass({
      //   processor: (css) =>
      //     postcss([autoprefixer])
      //       .process(css)
      //       .then((result) => result.css),
      // }),
      postcss({
        extract: false,
        writeDefinitions: true,
        modules: true,
        namedExports: true,
        minimize: true,
        plugins: [autoprefixer(), cssnano({ preset: 'default' })],
        inject(cssVariableName) {
          return `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`;
        },
      }),
      terser(),
    ],
  },
  {
    input: entryPoints,
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].cjs',
      },
    ],

    external: [
      ...Object.keys({
        ...packageJson.peerDependencies,
        ...packageJson.dependencies,
      }),
    ],
    plugins: [
      resolve({ extensions: ['.ts', '.tsx', '.json'] }),
      peerDepsExternal(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist',
          outDir: 'dist',
        },
      }),

      // sass({
      //   processor: (css) =>
      //     postcss([autoprefixer])
      //       .process(css)
      //       .then((result) => result.css),
      // }),
      postcss({
        extract: false,
        writeDefinitions: true,
        modules: true,
        namedExports: true,
        minimize: true,
        plugins: [autoprefixer(), cssnano({ preset: 'default' })],
        inject(cssVariableName) {
          return `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`;
        },
      }),
      terser(),
    ],
  },
];
export default rollupConfig;

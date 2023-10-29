import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { builtinModules } from 'module';

const packageJson = require('./package.json');

/** @type {import('rollup').RollupOptions} */

const rollupConfig = [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'es',
        sourcemap: false,
        preserveModules: true,
        exports: 'named',
      },
    ],
    external: [
      //   ...builtinModules,
      //   ...(packageJson.dependencies
      //     ? Object.keys(packageJson.dependencies)
      //     : []),
      //   ...(packageJson.devDependencies
      //     ? Object.keys(packageJson.devDependencies)
      //     : []),
      //   ...(packageJson.peerDependencies
      //     ? Object.keys(packageJson.peerDependencies)
      //     : []),
    ],
    plugins: [
      resolve({ extensions: ['.ts', '.tsx', '.json'] }),
      peerDepsExternal(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist/src',
        },
      }),
      postcss({
        extract: false,
        writeDefinitions: true,
        modules: true,
        namedExports: true,
        minimize: true,
        plugins: [autoprefixer()],
      }),
      terser(),
    ],
    external: ['react', 'react-dom', 'styled-components', 'lodash'],
  },
];
export default rollupConfig;

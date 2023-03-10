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

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: false,
        exports: 'named',
      },
      // {
      //   dir: 'dist/',
      //   format: 'cjs',
      //   sourcemap: false,
      //   preserveModules: false,
      //   exports: 'named',
      // },
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
      peerDepsExternal(),
      resolve({ extensions: ['.ts', '.tsx', '.json'] }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          declaration: false,
          declarationDir: 'dist',
        },
      }),
      postcss({
        extract: false,
        writeDefinitions: true,
        modules: true,
        namedExports: true,
        plugins: [autoprefixer()],
      }),
      terser(),
    ],
    external: ['react', 'react-dom', 'styled-components'],
  },
  //   {
  // input: 'dist/esm/types/index.d.ts',
  // output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  // plugins: [dts.default()],
  //   },
];

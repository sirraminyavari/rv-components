import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic', babel: {} }),
    dts({
      insertTypesEntry: true,
      outputDir: 'dist/src/lib',
    }),
  ],
  build: {
    rollupOptions: {
      input: [
        path.resolve(__dirname, 'src/lib/index.ts'),
        path.resolve(__dirname, 'src/lib/constant/index.ts'),
        path.resolve(__dirname, 'src/lib/components/index.ts'),
        path.resolve(__dirname, 'src/lib/helpers/index.ts'),
        path.resolve(__dirname, 'src/lib/hooks/index.ts'),
        path.resolve(__dirname, 'src/lib/utilities/index.ts'),
      ],
      preserveModules: true,
      preserveEntrySignatures: 'strict',
      external: [
        'react',
        'react-dom',
        'styled-components',
        'prop-types',
        'classnames',
        'react/jsx-runtime',
        'uuid',
        'react-icons/fa',
        'react-icons/io5',
      ],
      output: {
        dir: 'dist',
        format: 'es',
        preserveModules: true,
        entryFileNames: '[name].js',
        globals: {
          react: 'react',
          uuid: 'uuid',
          'react-icons/fa': 'react-icons/fa',
          'react-icons/io5': 'react-icons/io5',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
          classnames: 'classnames',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});

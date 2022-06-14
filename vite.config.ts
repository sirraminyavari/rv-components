import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic' }),
    dts({
      insertTypesEntry: true,
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
      external: ['react', 'react-dom', 'styled-components', 'prop-types'],
      output: {
        dir: 'dist',
        format: 'es',
        preserveModules: true,
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    },
  },
});

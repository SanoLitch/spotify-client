import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  oxc: false,
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.e2e-spec.ts'], 
    // setupFiles: ['test/setup.ts'],     
  },
  resolve: {
    alias: {
      '@shared': './src/shared',
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});

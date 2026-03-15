import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  oxc: false,
  test: {
    globals: true, 
    environment: 'node',
    root: '.',
    // setupFiles: ['./test/setup.ts'], 
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/index.ts',
        'src/**/types.ts',
        'src/**/*.types.ts',
        'src/**/*.dto.ts',
        'src/**/*.module.ts'
      ],
    },
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

import {
  defineConfig, loadEnv,
} from 'vite';
import react from '@vitejs/plugin-react-swc';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const cwd = process.cwd();
  const {
    API_URL = '', APP_PORT = 5137,
  } = loadEnv(mode, cwd, '');
  const apiUrl = String(API_URL);
  const appPort = Number(APP_PORT);

  return {
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
      alias: {
        '@shared': resolve(cwd, 'src/shared'),
      },
    },
    server: {
      host: '127.0.0.1',
      port: appPort,
      proxy: {
        [`/api`]: {
          target: apiUrl,
          secure: false,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('/api'), ''),
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  };
});

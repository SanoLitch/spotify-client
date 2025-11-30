import {
  defineConfig, loadEnv,
} from 'vite';
import react from '@vitejs/plugin-react-swc';
import observerPlugin from 'mobx-react-observer/swc-plugin';

export default defineConfig(({ mode }) => {
  const cwd = process.cwd();
  const {
    API_URL = '', APP_PORT = 5137,
  } = loadEnv(mode, cwd, '');
  const apiUrl = String(API_URL);
  const appPort = Number(APP_PORT);

  return {
    plugins: [react({ plugins: [] })],
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
  };
});

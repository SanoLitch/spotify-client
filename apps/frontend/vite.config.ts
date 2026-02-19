import {
  defineConfig, loadEnv,
} from 'vite';

export default defineConfig(({ mode }) => {
  const cwd = process.cwd();
  const {
    API_URL = '', APP_PORT = 5137,
  } = loadEnv(mode, cwd, '');
  const apiUrl = String(API_URL);
  const appPort = Number(APP_PORT);

  return {
    plugins: [],
    test: {
      globals: true,
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
  };
});

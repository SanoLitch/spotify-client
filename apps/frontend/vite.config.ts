import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import observerPlugin from "mobx-react-observer/swc-plugin";
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    basicSsl(),
    react({
      plugins: [
        observerPlugin(),
      ],
    }
  )],
  server: { 
    port: 5173 
  }
})

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend()
  ],
  base: '/', // './' 일때 정적배포는 문제발생
  optimizeDeps: {},
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        entryFileNames: "[name].[hash].js",
        assetFileNames: "public/[name].[hash].[ext]",
        chunkFileNames: "page/[name].[hash].js",
      },
    },
  },
})

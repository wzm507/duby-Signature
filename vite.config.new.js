import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    strictPort: false
  },
  resolve: {
    alias: {
      '@img': resolve(__dirname, './img'),
      '@images_new': resolve(__dirname, './images_new')
    }
  },
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg', '**/*.mp4', '**/*.webm', '**/*.ogg'],
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: 'esbuild'
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './images_new/**/*.{png,jpg,jpeg,webp,svg}',
          dest: './images_new'
        }
      ]
    })
  ]
});
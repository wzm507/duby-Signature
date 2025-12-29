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
      // 添加别名，指向项目根目录的img目录
      '@img': resolve(__dirname, './img'),
      '@images_new': resolve(__dirname, './images_new')
    }
  },
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg', '**/*.mp4', '**/*.webm', '**/*.ogg']
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './img/**/*',
          dest: './img'
        },
        {
          src: './images_new/**/*',
          dest: './images_new'
        },
        {
          src: './sp/**/*',
          dest: './sp'
        }
      ]
    })
  ]
});

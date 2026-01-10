import { defineConfig } from 'vite';
import { resolve } from 'path';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg', '**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP', '**/*.SVG']
  },
  plugins: [
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: resolve(__dirname, 'images_new/**/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}'),
    //       dest: 'images_new'
    //     }
    //   ]
    // })
  ]
});
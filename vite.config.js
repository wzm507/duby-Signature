import { defineConfig } from 'vite';
import { resolve } from 'path';

// 确保静态HTML文件能够正常访问
export default defineConfig({
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg', '**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP', '**/*.SVG']
  },
  plugins: [],
  // 配置路由，确保静态HTML文件能被正确访问
  server: {
    // 禁用单页应用的重写规则，确保静态HTML文件可以直接访问
    strictPort: true
  },
  // 配置构建选项
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});

import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

// 插件：复制并更新静态 HTML 文件
function copyAndUpdateStaticHTML() {
  return {
    name: 'copy-and-update-static-html',
    writeBundle() {
      const staticHTMLFiles = [
        'featured-properties.html',
        'rent.html',
        'property-detail.html',
        'off-plan.html',
        'about.html',
        'services.html',
        'communities.html',
        'developers.html',
        'all-news.html',
        'career.html'
      ];

      staticHTMLFiles.forEach(file => {
        const sourcePath = path.resolve(__dirname, 'public', file);
        const destPath = path.resolve(__dirname, 'dist', file);

        if (fs.existsSync(sourcePath)) {
          let content = fs.readFileSync(sourcePath, 'utf-8');
          // 替换 /src/main.js 为 /assets/index.js
          content = content.replace(
            /<script type="module" src="\/src\/main\.js"><\/script>/g,
            '<script type="module" src="/assets/index.js"></script>'
          );
          fs.writeFileSync(destPath, content);
          console.log(`Copied and updated: ${file}`);
        }
      });

      // 复制 public 目录下的所有静态资源
      const publicDirPath = path.resolve(__dirname, 'public');
      const publicSubDirs = [
        'img',
        'off',
        'ewm',
        'aboutus',
        'banner',
        'Communities',
        'DAMAC Islands',
        'Developers',
        'Greenridge',
        'icons',
        'Lyvia by Palace',
        'Services',
        'Terra Gardens',
        'sp',
        'png',
        'js',
        'images_new' // 现在包含 images_new，因为它已被复制到 public 目录
      ];

      // 复制目录函数
      function copyDirectory(source, destination) {
        if (!fs.existsSync(destination)) {
          fs.mkdirSync(destination, { recursive: true });
        }
        const files = fs.readdirSync(source);
        files.forEach(file => {
          const sourcePath = path.join(source, file);
          const destPath = path.join(destination, file);
          if (fs.statSync(sourcePath).isDirectory()) {
            copyDirectory(sourcePath, destPath);
          } else {
            fs.copyFileSync(sourcePath, destPath);
          }
        });
      }

      publicSubDirs.forEach(subDir => {
        const sourceSubDirPath = path.join(publicDirPath, subDir);
        const destSubDirPath = path.join(__dirname, 'dist', subDir);
        if (fs.existsSync(sourceSubDirPath)) {
          copyDirectory(sourceSubDirPath, destSubDirPath);
          console.log(`Copied public/${subDir} directory manually`);
        }
      });
    }
  };
}

// 确保静态HTML文件能够正常访问
export default defineConfig({
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg', '**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP', '**/*.SVG'],
    rollupOptions: {
      output: {
        // 固定 JS 文件名，避免哈希变化导致引用问题
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        // 保持静态资源的原始路径结构
        assetFileNames: (assetInfo) => {
          // 对于public目录下的静态资源，保持原始路径
          if (assetInfo.name && assetInfo.name.startsWith('public/')) {
            return assetInfo.name.replace('public/', '');
          }
          // 对于其他资源，放在assets目录
          return 'assets/[name].[ext]';
        }
      }
    }
  },
  // 配置静态资源目录
  publicDir: 'public',
  plugins: [
    copyAndUpdateStaticHTML()
  ],
  // 配置路由，确保静态HTML文件能被正确访问
  server: {
    // 禁用单页应用的重写规则，确保静态HTML文件可以直接访问
    strictPort: true,
    // 配置代理，解决跨域问题
    proxy: {
      '/send-email': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  // 配置构建选项
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});

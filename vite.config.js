import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

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

      // 直接从根目录复制图片文件夹到dist目录
      const imageDirectories = [
        'images_new',
        'img'
      ];

      imageDirectories.forEach(dir => {
        const sourcePath = path.resolve(__dirname, dir);
        const destPath = path.resolve(__dirname, 'dist', dir);

        if (fs.existsSync(sourcePath)) {
          copyDirectory(sourcePath, destPath);
          console.log(`Copied image directory: ${dir}`);
        }
      });

      // 复制public目录中的图片文件夹到dist根目录，以匹配代码中的路径引用
      const publicImageDirs = ['Terra Gardens', 'Greenridge', 'DAMAC Islands', 'Lyvia by Palace', 'off'];
      publicImageDirs.forEach(dir => {
        const sourcePath = path.resolve(__dirname, 'public', dir);
        const destPath = path.resolve(__dirname, 'dist', dir);

        if (fs.existsSync(sourcePath)) {
          // 确保目标目录不存在，避免覆盖问题
          if (fs.existsSync(destPath)) {
            fs.rmSync(destPath, { recursive: true, force: true });
          }
          copyDirectory(sourcePath, destPath);
          console.log(`Copied public directory: ${dir}`);
        } else {
          console.log(`Source directory not found: ${sourcePath}`);
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
        // 对于其他资源，放在assets目录
        assetFileNames: 'assets/[name].[ext]'
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

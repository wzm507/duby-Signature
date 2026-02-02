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

// 复制 images_new 目录
const sourceImagesNewPath = path.resolve('images_new');
const destImagesNewPath = path.resolve('dist', 'images_new');

// 清理目标目录
if (fs.existsSync(destImagesNewPath)) {
  fs.rmSync(destImagesNewPath, { recursive: true, force: true });
  console.log('Cleaned dist/images_new directory');
}

// 创建目标目录
fs.mkdirSync(destImagesNewPath, { recursive: true });

// 复制整个 images_new 目录
if (fs.existsSync(sourceImagesNewPath)) {
  copyDirectory(sourceImagesNewPath, destImagesNewPath);
  console.log('Copied entire images_new directory manually');
} else {
  console.log('Source images_new directory does not exist');
}

// 验证结果
console.log('\nVerifying directory structure:');
if (fs.existsSync(path.join(destImagesNewPath, 'buy-new'))) {
  console.log('✓ buy-new directory exists in dist/images_new');
  const buyNewDirs = fs.readdirSync(path.join(destImagesNewPath, 'buy-new'));
  console.log(`✓ buy-new directory contains ${buyNewDirs.length} subdirectories`);
} else {
  console.log('✗ buy-new directory does not exist in dist/images_new');
}

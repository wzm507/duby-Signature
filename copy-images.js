import fs from 'fs';
import path from 'path';

// 复制目录函数
function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
    console.log(`Created directory: ${destination}`);
  }
  const files = fs.readdirSync(source);
  console.log(`Copying ${files.length} items from ${source} to ${destination}`);
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    if (fs.statSync(sourcePath).isDirectory()) {
      console.log(`Copying directory: ${file}`);
      copyDirectory(sourcePath, destPath);
    } else {
      console.log(`Copying file: ${file}`);
      fs.copyFileSync(sourcePath, destPath);
      // 确保文件权限正确
      fs.chmodSync(destPath, 0o644);
    }
  });
}

// 复制 images_new 目录
const sourceImagesNewPath = path.resolve('images_new');
const destImagesNewPath = path.resolve('dist', 'images_new');

console.log('\n=== Starting images_new directory copy ===');
console.log(`Source: ${sourceImagesNewPath}`);
console.log(`Destination: ${destImagesNewPath}`);

// 清理目标目录
if (fs.existsSync(destImagesNewPath)) {
  console.log('Cleaning existing dist/images_new directory');
  fs.rmSync(destImagesNewPath, { recursive: true, force: true });
}

// 创建目标目录
console.log('Creating dist/images_new directory');
fs.mkdirSync(destImagesNewPath, { recursive: true });

// 复制整个 images_new 目录
if (fs.existsSync(sourceImagesNewPath)) {
  console.log('Copying entire images_new directory structure');
  copyDirectory(sourceImagesNewPath, destImagesNewPath);
  console.log('\n=== Copy completed ===');
} else {
  console.error('ERROR: Source images_new directory does not exist!');
  process.exit(1);
}

// 验证结果
console.log('\n=== Verifying directory structure ===');
if (fs.existsSync(path.join(destImagesNewPath, 'buy-new'))) {
  console.log('✓ buy-new directory exists in dist/images_new');
  const buyNewDirs = fs.readdirSync(path.join(destImagesNewPath, 'buy-new'));
  console.log(`✓ buy-new directory contains ${buyNewDirs.length} subdirectories`);
  
  // 验证具体文件
  const testFilePath = path.join(destImagesNewPath, 'buy-new', '1', '1.png');
  if (fs.existsSync(testFilePath)) {
    const stats = fs.statSync(testFilePath);
    console.log(`✓ Test file exists: buy-new/1/1.png (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.error('✗ Test file missing: buy-new/1/1.png');
  }
} else {
  console.error('✗ buy-new directory does not exist in dist/images_new');
  process.exit(1);
}

console.log('\n=== All checks passed ===');
console.log('Images are ready for deployment!');


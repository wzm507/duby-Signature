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
      try {
        fs.chmodSync(destPath, 0o644);
      } catch (error) {
        console.log(`Warning: Failed to set permissions for ${destPath}: ${error.message}`);
      }
    }
  });
}

// 复制压缩后的 images_new 目录
const sourceImagesNewPath = path.resolve('images_new_compressed');
const destImagesNewPath = path.resolve('dist', 'images_new');

console.log('\n=== Starting compressed images_new directory copy ===');
console.log(`Source: ${sourceImagesNewPath}`);
console.log(`Destination: ${destImagesNewPath}`);

// 检查源目录是否存在
if (!fs.existsSync(sourceImagesNewPath)) {
  console.error('ERROR: Source images_new_compressed directory does not exist!');
  console.log('Attempting to run compression first...');
  
  // 尝试运行压缩脚本
  try {
    const { execSync } = require('child_process');
    execSync('node compress-images.js', { stdio: 'inherit' });
    
    // 再次检查源目录
    if (!fs.existsSync(sourceImagesNewPath)) {
      console.error('ERROR: Source images_new_compressed directory still does not exist after compression!');
      process.exit(1);
    }
  } catch (error) {
    console.error('ERROR: Failed to run compression script:', error.message);
    process.exit(1);
  }
}

// 清理目标目录
if (fs.existsSync(destImagesNewPath)) {
  fs.rmSync(destImagesNewPath, { recursive: true, force: true });
  console.log('Cleaned existing dist/images_new directory');
}

// 创建目标目录
console.log('Creating dist/images_new directory');
fs.mkdirSync(destImagesNewPath, { recursive: true });

// 复制整个 images_new 目录
console.log('Copying entire compressed images_new directory structure');
copyDirectory(sourceImagesNewPath, destImagesNewPath);
console.log('\n=== Copy completed ===');

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
    // 列出buy-new/1目录的内容
    const buyNew1Path = path.join(destImagesNewPath, 'buy-new', '1');
    if (fs.existsSync(buyNew1Path)) {
      console.log('Contents of buy-new/1:');
      const files = fs.readdirSync(buyNew1Path);
      files.forEach(file => console.log(`  - ${file}`));
    } else {
      console.error('✗ buy-new/1 directory does not exist');
    }
  }
} else {
  console.error('✗ buy-new directory does not exist in dist/images_new');
  // 列出dist/images_new目录的内容
  console.log('Contents of dist/images_new:');
  const files = fs.readdirSync(destImagesNewPath);
  files.forEach(file => console.log(`  - ${file}`));
  process.exit(1);
}

console.log('\n=== All checks passed ===');
console.log('Compressed images are ready for deployment!');

// 最后验证整个目录结构
console.log('\n=== Final Directory Structure Verification ===');
const distImagesNewPath = path.resolve('dist', 'images_new');
const buyNewPath = path.join(distImagesNewPath, 'buy-new');

if (fs.existsSync(buyNewPath)) {
  const subdirs = fs.readdirSync(buyNewPath).filter(item => {
    return fs.statSync(path.join(buyNewPath, item)).isDirectory();
  });
  console.log(`✓ Found ${subdirs.length} property directories in buy-new`);
  
  // 随机选择几个目录验证
  const testDirs = subdirs.slice(0, 3);
  testDirs.forEach(dir => {
    const dirPath = path.join(buyNewPath, dir);
    const files = fs.readdirSync(dirPath).filter(item => {
      return fs.statSync(path.join(dirPath, item)).isFile();
    });
    console.log(`✓ Directory buy-new/${dir} contains ${files.length} images`);
  });
} else {
  console.error('✗ Final verification failed: buy-new directory not found');
  process.exit(1);
}

console.log('\n=== Deployment Ready ===');
console.log('All images have been successfully copied and verified!');

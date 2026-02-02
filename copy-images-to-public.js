import fs from 'fs';
import path from 'path';

console.log('=== Starting images_new directory copy to public ===');

// 源目录和目标目录
const sourceDir = path.join(process.cwd(), 'images_new');
const destDir = path.join(process.cwd(), 'public', 'images_new');

console.log(`Source: ${sourceDir}`);
console.log(`Destination: ${destDir}`);

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

// 清理目标目录
if (fs.existsSync(destDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
  console.log('Cleaned existing public/images_new directory');
}

// 创建目标目录
console.log('Creating public/images_new directory');
fs.mkdirSync(destDir, { recursive: true });

// 复制整个 images_new 目录
console.log('Copying entire images_new directory structure to public');
copyDirectory(sourceDir, destDir);
console.log('\n=== Copy completed ===');

// 验证结果
console.log('\n=== Verifying directory structure ===');
if (fs.existsSync(path.join(destDir, 'buy-new'))) {
  console.log('✓ buy-new directory exists in public/images_new');
  const buyNewDirs = fs.readdirSync(path.join(destDir, 'buy-new'));
  console.log(`✓ buy-new directory contains ${buyNewDirs.length} subdirectories`);
  
  // 验证具体文件
  const testFilePath = path.join(destDir, 'buy-new', '1', '1.png');
  if (fs.existsSync(testFilePath)) {
    const stats = fs.statSync(testFilePath);
    console.log(`✓ Test file exists: buy-new/1/1.png (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.error('✗ Test file missing: buy-new/1/1.png');
  }
} else {
  console.error('✗ buy-new directory does not exist in public/images_new');
  process.exit(1);
}

console.log('\n=== All checks passed ===');
console.log('Images have been successfully copied to public directory!');
console.log('Vite will now automatically include these images in the build.');

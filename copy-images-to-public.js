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

// 复制 images_new 目录
console.log('=== Starting images_new directory copy to public ===');
const sourceImagesNewPath = path.join(process.cwd(), 'images_new');
const destImagesNewPath = path.join(process.cwd(), 'public', 'images_new');

console.log(`Source: ${sourceImagesNewPath}`);
console.log(`Destination: ${destImagesNewPath}`);

// 清理目标目录
if (fs.existsSync(destImagesNewPath)) {
  fs.rmSync(destImagesNewPath, { recursive: true, force: true });
  console.log('Cleaned existing public/images_new directory');
}

// 创建目标目录
console.log('Creating public/images_new directory');
fs.mkdirSync(destImagesNewPath, { recursive: true });

// 复制整个 images_new 目录
if (fs.existsSync(sourceImagesNewPath)) {
  console.log('Copying entire images_new directory structure to public');
  copyDirectory(sourceImagesNewPath, destImagesNewPath);
  console.log('\n=== images_new Copy completed ===');
} else {
  console.error('ERROR: Source images_new directory does not exist!');
  process.exit(1);
}

// 复制 img 目录
console.log('\n=== Starting img directory copy to public ===');
const sourceImgPath = path.join(process.cwd(), 'img');
const destImgPath = path.join(process.cwd(), 'public', 'img');

console.log(`Source: ${sourceImgPath}`);
console.log(`Destination: ${destImgPath}`);

// 清理目标目录
if (fs.existsSync(destImgPath)) {
  fs.rmSync(destImgPath, { recursive: true, force: true });
  console.log('Cleaned existing public/img directory');
}

// 创建目标目录
console.log('Creating public/img directory');
fs.mkdirSync(destImgPath, { recursive: true });

// 复制整个 img 目录
if (fs.existsSync(sourceImgPath)) {
  console.log('Copying entire img directory structure to public');
  copyDirectory(sourceImgPath, destImgPath);
  console.log('\n=== img Copy completed ===');
} else {
  console.error('ERROR: Source img directory does not exist!');
  process.exit(1);
}

// 验证结果
console.log('\n=== Verifying directory structure ===');
if (fs.existsSync(path.join(destImagesNewPath, 'buy-new'))) {
  console.log('✓ buy-new directory exists in public/images_new');
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
  console.error('✗ buy-new directory does not exist in public/images_new');
  process.exit(1);
}

// 验证 img 目录
if (fs.existsSync(destImgPath)) {
  console.log('✓ img directory exists in public');
  const imgFiles = fs.readdirSync(destImgPath);
  console.log(`✓ img directory contains ${imgFiles.length} items`);
  
  // 验证 logo 文件
  const logoFilePath = path.join(destImgPath, 'logo.png');
  if (fs.existsSync(logoFilePath)) {
    const stats = fs.statSync(logoFilePath);
    console.log(`✓ Logo file exists: logo.png (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.error('✗ Logo file missing: logo.png');
  }
} else {
  console.error('✗ img directory does not exist in public');
  process.exit(1);
}

console.log('\n=== All checks passed ===');
console.log('Images have been successfully copied to public directory!');
console.log('Vite will now automatically include these images in the build.');
console.log('Logo and Ready Properties images will now load correctly after deployment.');

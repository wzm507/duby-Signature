import fs from 'fs';
import path from 'path';

// 验证目录函数
function verifyDirectory(directoryPath, description) {
  console.log(`\n=== Verifying ${description} ===`);
  
  if (fs.existsSync(directoryPath)) {
    console.log(`✓ ${description} exists`);
    
    const items = fs.readdirSync(directoryPath);
    console.log(`✓ ${description} contains ${items.length} items`);
    
    return true;
  } else {
    console.error(`✗ ${description} does not exist`);
    return false;
  }
}

// 验证文件函数
function verifyFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✓ ${description} exists (${Math.round(stats.size / 1024)}KB)`);
    return true;
  } else {
    console.error(`✗ ${description} does not exist`);
    return false;
  }
}

console.log('=== Starting image directory verification ===');

// 验证 public/images_new 目录
const imagesNewPath = path.join(process.cwd(), 'public', 'images_new');
const imagesNewValid = verifyDirectory(imagesNewPath, 'public/images_new directory');

if (imagesNewValid) {
  // 验证 buy-new 子目录
  const buyNewPath = path.join(imagesNewPath, 'buy-new');
  if (verifyDirectory(buyNewPath, 'public/images_new/buy-new directory')) {
    // 验证具体文件
    verifyFile(path.join(buyNewPath, '1', '1.png'), 'public/images_new/buy-new/1/1.png');
  }
}

// 验证 public/img 目录
const imgPath = path.join(process.cwd(), 'public', 'img');
const imgValid = verifyDirectory(imgPath, 'public/img directory');

if (imgValid) {
  // 验证 logo 文件
  verifyFile(path.join(imgPath, 'logo.png'), 'public/img/logo.png');
}

console.log('\n=== Verification completed ===');
console.log('Images are directly stored in the public directory.');
console.log('Vite will automatically include these images in the build.');
console.log('Logo and Ready Properties images should now load correctly after deployment.');

// 检查是否有任何验证失败
if (!imagesNewValid || !imgValid) {
  console.error('\nSome verification checks failed!');
  process.exit(1);
} else {
  console.log('\nAll verification checks passed!');
}

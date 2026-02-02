import fs from 'fs';
import path from 'path';

console.log('=== Verifying build results ===');

// 检查dist/images_new目录
const distImagesPath = path.join(process.cwd(), 'dist', 'images_new');
if (fs.existsSync(distImagesPath)) {
  console.log('✓ dist/images_new directory exists');
  
  // 检查buy-new目录
  if (fs.existsSync(path.join(distImagesPath, 'buy-new'))) {
    console.log('✓ buy-new directory exists');
    
    // 检查buy-new/1目录
    if (fs.existsSync(path.join(distImagesPath, 'buy-new', '1'))) {
      const files = fs.readdirSync(path.join(distImagesPath, 'buy-new', '1'));
      console.log(`✓ buy-new/1 directory contains ${files.length} files`);
      
      // 检查1.png文件
      if (files.includes('1.png')) {
        const stats = fs.statSync(path.join(distImagesPath, 'buy-new', '1', '1.png'));
        console.log(`✓ 1.png file exists (${Math.round(stats.size / 1024)}KB)`);
        console.log('✓ All verification checks passed!');
      } else {
        console.log('✗ 1.png file missing');
      }
    } else {
      console.log('✗ buy-new/1 directory missing');
    }
  } else {
    console.log('✗ buy-new directory missing');
  }
} else {
  console.log('✗ dist/images_new directory missing');
}

console.log('=== Verification complete ===');

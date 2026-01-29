const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 需要压缩的图片目录
const imageDirectories = [
  'public/aboutus',
  'public/banner',
  'public/Communities',
  'public/DAMAC Islands',
  'public/Developers',
  'public/Greenridge',
  'public/Lyvia by Palace',
  'public/Services',
  'public/Terra Gardens',
  'public/images_new',
  'public/img'
];

// 压缩配置
const compressionConfig = {
  jpeg: {
    quality: 70,
    progressive: true
  },
  png: {
    quality: 70,
    compressionLevel: 6
  },
  webp: {
    quality: 70
  }
};

// 压缩图片函数
async function compressImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // 根据图片类型进行压缩
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      await image.jpeg(compressionConfig.jpeg).toFile(outputPath);
    } else if (metadata.format === 'png') {
      await image.png(compressionConfig.png).toFile(outputPath);
    } else if (metadata.format === 'webp') {
      await image.webp(compressionConfig.webp).toFile(outputPath);
    } else {
      console.log(`Skipping unsupported format: ${inputPath}`);
      return false;
    }
    
    // 计算压缩前后的大小
    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    
    console.log(`${path.basename(inputPath)}: ${(originalSize / 1024).toFixed(2)}KB → ${(compressedSize / 1024).toFixed(2)}KB (${savings}% saved)`);
    
    return true;
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error.message);
    return false;
  }
}

// 遍历目录压缩图片
async function compressImagesInDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory not found: ${directory}`);
    return;
  }
  
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      await compressImagesInDirectory(filePath);
    } else if (stats.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const tempPath = filePath.replace(ext, `.compressed${ext}`);
        const success = await compressImage(filePath, tempPath);
        
        if (success) {
          // 替换原文件
          fs.unlinkSync(filePath);
          fs.renameSync(tempPath, filePath);
        } else if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

// 主函数
async function main() {
  console.log('Starting image compression...');
  console.log('================================');
  
  for (const directory of imageDirectories) {
    console.log(`\nProcessing directory: ${directory}`);
    await compressImagesInDirectory(directory);
  }
  
  console.log('================================');
  console.log('Image compression completed!');
}

// 运行
if (require.main === module) {
  main();
}

module.exports = { compressImagesInDirectory };

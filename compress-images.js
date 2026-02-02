import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('=== Starting image compression ===');

// 压缩配置
const compressConfig = {
  jpeg: {
    quality: 80,
    progressive: true,
  },
  png: {
    quality: 80,
    compressionLevel: 6,
  },
  webp: {
    quality: 80,
  },
  // 最大宽度，保持原始宽高比
  maxWidth: 1920,
};

// 需要压缩的目录
const sourceDir = path.join(process.cwd(), 'images_new');
const outputDir = path.join(process.cwd(), 'images_new_compressed');

// 支持的图片格式
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];

// 清理输出目录
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
  console.log('Cleaned existing output directory');
}

// 创建输出目录
fs.mkdirSync(outputDir, { recursive: true });
console.log('Created output directory:', outputDir);

// 压缩图片函数
async function compressImage(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const fileName = path.basename(inputPath, ext);
    const outputFormat = ext;
    
    // 读取原始文件大小
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    
    console.log(`Compressing: ${inputPath}`);
    
    // 使用sharp进行压缩
    let pipeline = sharp(inputPath);
    
    // 获取图片信息
    const metadata = await pipeline.metadata();
    
    // 如果图片宽度超过最大宽度，进行 resize
    if (metadata.width > compressConfig.maxWidth) {
      pipeline = pipeline.resize({
        width: compressConfig.maxWidth,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      });
    }
    
    // 根据文件类型设置压缩参数
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg(compressConfig.jpeg);
    } else if (ext === '.png') {
      pipeline = pipeline.png(compressConfig.png);
    } else if (ext === '.webp') {
      pipeline = pipeline.webp(compressConfig.webp);
    }
    
    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 执行压缩并保存
    await pipeline.toFile(outputPath);
    
    // 计算压缩后的大小
    const compressedStats = fs.statSync(outputPath);
    const compressedSize = compressedStats.size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
    
    console.log(`✓ Compressed: ${fileName}${ext}`);
    console.log(`  Original size: ${Math.round(originalSize / 1024)}KB`);
    console.log(`  Compressed size: ${Math.round(compressedSize / 1024)}KB`);
    console.log(`  Reduction: ${compressionRatio}%`);
    
    return {
      originalSize,
      compressedSize,
      reduction: parseFloat(compressionRatio),
    };
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error.message);
    return null;
  }
}

// 遍历目录并压缩所有图片
async function processDirectory(dir, outputDir) {
  const files = fs.readdirSync(dir);
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let processedFiles = 0;
  let failedFiles = 0;
  
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(outputDir, file);
    
    if (fs.statSync(inputPath).isDirectory()) {
      // 递归处理子目录
      const subOutputDir = path.join(outputDir, file);
      fs.mkdirSync(subOutputDir, { recursive: true });
      const result = await processDirectory(inputPath, subOutputDir);
      
      // 累加统计数据
      totalOriginalSize += result.totalOriginalSize;
      totalCompressedSize += result.totalCompressedSize;
      processedFiles += result.processedFiles;
      failedFiles += result.failedFiles;
    } else {
      // 检查是否是支持的图片格式
      const ext = path.extname(inputPath).toLowerCase();
      if (supportedFormats.includes(ext)) {
        const result = await compressImage(inputPath, outputPath);
        if (result) {
          totalOriginalSize += result.originalSize;
          totalCompressedSize += result.compressedSize;
          processedFiles++;
        } else {
          failedFiles++;
        }
      }
    }
  }
  
  return {
    totalOriginalSize,
    totalCompressedSize,
    processedFiles,
    failedFiles,
  };
}

// 主函数
async function main() {
  try {
    console.log('Starting image compression process...');
    console.log('Source directory:', sourceDir);
    console.log('Output directory:', outputDir);
    
    const startTime = Date.now();
    const result = await processDirectory(sourceDir, outputDir);
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log('\n=== Compression Summary ===');
    console.log(`Total files processed: ${result.processedFiles}`);
    console.log(`Total files failed: ${result.failedFiles}`);
    console.log(`Total original size: ${Math.round(result.totalOriginalSize / (1024 * 1024))}MB`);
    console.log(`Total compressed size: ${Math.round(result.totalCompressedSize / (1024 * 1024))}MB`);
    console.log(`Total reduction: ${((result.totalOriginalSize - result.totalCompressedSize) / result.totalOriginalSize * 100).toFixed(2)}%`);
    console.log(`Compression time: ${duration.toFixed(2)} seconds`);
    console.log('\n=== Compression Complete ===');
    
  } catch (error) {
    console.error('Error during compression process:', error);
  }
}

// 运行主函数
main();

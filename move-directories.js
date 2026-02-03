import fs from 'fs';
import path from 'path';

function moveDirectory(source, destination) {
  try {
    // 检查目标目录是否存在
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    // 构建目标目录路径
    const destDir = path.join(destination, path.basename(source));

    // 检查目标目录是否已存在
    if (fs.existsSync(destDir)) {
      // 如果存在，先删除
      console.log(`目标目录 ${destDir} 已存在，正在删除...`);
      fs.rmSync(destDir, { recursive: true, force: true });
    }

    // 移动目录
    console.log(`正在移动 ${source} 到 ${destDir}...`);
    fs.renameSync(source, destDir);
    console.log(`成功移动 ${source} 到 ${destDir}`);
    return true;
  } catch (error) {
    console.error(`移动目录时出错: ${error.message}`);
    return false;
  }
}

// 移动images_new目录到public目录
const imagesNewSource = path.join(process.cwd(), 'images_new');
const imagesNewDest = path.join(process.cwd(), 'public');
moveDirectory(imagesNewSource, imagesNewDest);

// 移动img目录到public目录
const imgSource = path.join(process.cwd(), 'img');
const imgDest = path.join(process.cwd(), 'public');
moveDirectory(imgSource, imgDest);

// 验证移动结果
console.log('\n验证移动结果:');
const publicDir = path.join(process.cwd(), 'public');
const publicContents = fs.readdirSync(publicDir, { withFileTypes: true });
publicContents.forEach(item => {
  if (item.isDirectory()) {
    console.log(`目录: ${item.name}`);
  }
});

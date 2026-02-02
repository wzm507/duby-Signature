import fs from 'fs';
import path from 'path';
import http from 'https';

console.log('=== 部署验证脚本 ===\n');

// 配置
const projectRoot = process.cwd();
const publicImagesDir = path.join(projectRoot, 'public', 'images_new');
const distImagesDir = path.join(projectRoot, 'dist', 'images_new');
const deploymentUrl = 'https://www.signaturehomesuae.com'; // 部署后的网站URL

// 步骤1: 检查本地构建产物
console.log('1. 检查本地构建产物');
checkLocalBuild();

// 步骤2: 测试部署后的图片URL
console.log('\n2. 测试部署后的图片URL');
testDeploymentImages();

// 步骤3: 分析可能的问题
console.log('\n3. 问题分析');
analyzePotentialIssues();

// 检查本地构建产物
function checkLocalBuild() {
  console.log('\n1.1 检查目录结构');
  console.log(`public/images_new: ${fs.existsSync(publicImagesDir) ? '✓ 存在' : '✗ 不存在'}`);
  console.log(`dist/images_new: ${fs.existsSync(distImagesDir) ? '✓ 存在' : '✗ 不存在'}`);
  
  if (fs.existsSync(distImagesDir)) {
    const buyNewDir = path.join(distImagesDir, 'buy-new');
    console.log(`\n1.2 检查buy-new目录`);
    console.log(`dist/images_new/buy-new: ${fs.existsSync(buyNewDir) ? '✓ 存在' : '✗ 不存在'}`);
    
    if (fs.existsSync(buyNewDir)) {
      const subdirs = fs.readdirSync(buyNewDir).filter(item => {
        return fs.statSync(path.join(buyNewDir, item)).isDirectory();
      });
      console.log(`✓ buy-new目录包含 ${subdirs.length} 个子目录`);
      
      // 检查具体文件
      console.log('\n1.3 检查具体图片文件');
      const testCases = [
        '1/1.png',
        '1/2.png', 
        '7/1.png',
        '7/image.png',
        '2/1.png',
        '3/1.png',
        '4/1.png',
        '5/1.png',
        '6/1.png'
      ];
      
      testCases.forEach(testPath => {
        const fullPath = path.join(distImagesDir, 'buy-new', testPath);
        if (fs.existsSync(fullPath)) {
          const stats = fs.statSync(fullPath);
          console.log(`✓ buy-new/${testPath} (${Math.round(stats.size / 1024)}KB)`);
        } else {
          console.error(`✗ buy-new/${testPath} 不存在`);
        }
      });
    }
  }
  
  // 检查构建产物大小
  if (fs.existsSync(distImagesDir)) {
    console.log('\n1.4 检查构建产物大小');
    const totalSize = calculateDirectorySize(distImagesDir);
    console.log(`✓ dist/images_new 目录大小: ${Math.round(totalSize / (1024 * 1024))}MB`);
  }
}

// 测试部署后的图片URL
function testDeploymentImages() {
  const testImages = [
    '/images_new/buy-new/1/1.png',
    '/images_new/buy-new/1/2.png',
    '/images_new/buy-new/7/1.png',
    '/images_new/buy-new/7/image.png'
  ];
  
  console.log('\n测试部署后的图片URL可访问性:');
  testImages.forEach((imagePath, index) => {
    const fullUrl = deploymentUrl + imagePath;
    
    // 测试图片URL
    setTimeout(() => {
      console.log(`\n测试 ${index + 1}: ${fullUrl}`);
      
      const options = {
        method: 'HEAD',
        timeout: 5000
      };
      
      const req = http.request(fullUrl, options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`内容类型: ${res.headers['content-type']}`);
        console.log(`内容长度: ${res.headers['content-length'] ? Math.round(res.headers['content-length'] / 1024) + 'KB' : '未知'}`);
        
        if (res.statusCode === 200) {
          console.log('✓ 图片可访问');
        } else {
          console.error('✗ 图片无法访问');
        }
      });
      
      req.on('error', (e) => {
        console.error(`✗ 请求错误: ${e.message}`);
      });
      
      req.on('timeout', () => {
        console.error('✗ 请求超时');
        req.destroy();
      });
      
      req.end();
    }, index * 2000);
  });
}

// 分析可能的问题
function analyzePotentialIssues() {
  console.log('\n3.1 可能的问题分析:');
  console.log('1. 缓存问题:');
  console.log('   - Vercel可能缓存了旧的构建产物');
  console.log('   - 浏览器可能缓存了旧的图片URL');
  console.log('   - 解决方案: 清理Vercel缓存，强制重新构建');
  
  console.log('\n2. 构建顺序问题:');
  console.log('   - copy-images步骤可能在构建后执行');
  console.log('   - 解决方案: 确保构建脚本先执行copy-images再执行vite build');
  
  console.log('\n3. 路径配置问题:');
  console.log('   - 图片引用路径可能不正确');
  console.log('   - 解决方案: 确保使用绝对路径 /images_new/...');
  
  console.log('\n4. Git LFS问题:');
  console.log('   - LFS对象可能未正确上传到GitHub');
  console.log('   - CI/CD环境可能未正确配置LFS');
  console.log('   - 解决方案: 确保GitHub Actions配置了lfs: true');
  
  console.log('\n5. Vercel配置问题:');
  console.log('   - Vercel可能使用了错误的构建命令');
  console.log('   - 解决方案: 确保vercel.json中的buildCommand正确');
}

// 计算目录大小的函数
function calculateDirectorySize(dir) {
  let totalSize = 0;
  
  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        traverse(filePath);
      } else {
        totalSize += stats.size;
      }
    });
  }
  
  traverse(dir);
  return totalSize;
}

// 清理Vercel缓存的建议
console.log('\n3.2 清理Vercel缓存的建议:');
console.log('1. 在Vercel控制台中:');
console.log('   - 进入项目设置');
console.log('   - 点击 "Build & Development Settings"');
console.log('   - 滚动到底部，点击 "Clear Build Cache"');
console.log('   - 然后重新触发构建');

console.log('\n2. 使用Vercel CLI清理缓存:');
console.log('   $ vercel build --prod');
console.log('   $ vercel deploy --prod');

console.log('\n3. 强制重新构建的方法:');
console.log('   - 在GitHub中提交一个空的变更');
console.log('   - 使用Git提交一个新的commit，即使没有实际更改');

console.log('\n=== 验证完成 ===');
console.log('\n📋 验证结果总结:');
console.log('- 本地构建产物: 已检查');
console.log('- 部署后图片URL: 已测试');
console.log('- 可能的问题: 已分析');
console.log('- 缓存清理建议: 已提供');

console.log('\n💡 下一步建议:');
console.log('1. 清理Vercel缓存并重新构建');
console.log('2. 检查Vercel构建日志，确认copy-images步骤成功执行');
console.log('3. 验证部署后的图片URL可访问性');
console.log('4. 如果问题持续存在，考虑调整构建顺序或路径配置');

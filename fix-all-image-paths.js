import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = __dirname;
const publicPath = path.join(scriptPath, 'public');
const srcPath = path.join(scriptPath, 'src');

console.log('Starting image path fix for all files...');

const files = [];
function getFiles(dir, ext) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFiles(fullPath, ext);
    } else if (entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  });
}

getFiles(publicPath, '.html');
getFiles(srcPath, '.js');

console.log(`Found ${files.length} files to process`);

let totalReplacements = 0;
let filesProcessed = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let fileReplacements = 0;

  // Fix JavaScript template strings that generate image paths with spaces
  // Replace: ` ${i}` with `-${i}` in image paths
  if (content.includes('` ${i}`')) {
    content = content.replaceAll('` ${i}`', '`-${i}`');
    fileReplacements++;
  }

  // Fix hardcoded image paths with spaces
  const replacements = [
    { from: 'image copy.png', to: 'image-copy.png' },
    { from: 'image copy 2.png', to: 'image-copy-2.png' },
    { from: 'image copy 3.png', to: 'image-copy-3.png' },
    { from: 'image copy 4.png', to: 'image-copy-4.png' },
    { from: 'image copy 5.png', to: 'image-copy-5.png' },
    { from: 'image copy 6.png', to: 'image-copy-6.png' },
    { from: 'image copy 7.png', to: 'image-copy-7.png' },
    { from: 'image copy 8.png', to: 'image-copy-8.png' },
    { from: 'image copy 9.png', to: 'image-copy-9.png' },
    { from: 'image copy 10.png', to: 'image-copy-10.png' },
    { from: 'image copy 11.png', to: 'image-copy-11.png' },
    { from: 'image copy 12.png', to: 'image-copy-12.png' },
    { from: 'image copy 13.png', to: 'image-copy-13.png' },
    { from: 'image copy 14.png', to: 'image-copy-14.png' },
    { from: 'image copy 15.png', to: 'image-copy-15.png' },
    { from: 'image copy 16.png', to: 'image-copy-16.png' },
    { from: 'image copy 17.png', to: 'image-copy-17.png' },
    { from: 'image copy 18.png', to: 'image-copy-18.png' },
    { from: 'image copy 19.png', to: 'image-copy-19.png' },
    { from: 'image copy 20.png', to: 'image-copy-20.png' }
  ];

  replacements.forEach(replacement => {
    if (content.includes(replacement.from)) {
      content = content.replaceAll(replacement.from, replacement.to);
      fileReplacements++;
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relativePath = path.relative(scriptPath, filePath);
    console.log(`Updated: ${relativePath} (${fileReplacements} replacements)`);
    totalReplacements += fileReplacements;
    filesProcessed++;
  }
});

console.log('\n=== Summary ===');
console.log(`Files processed: ${filesProcessed}`);
console.log(`Total replacements: ${totalReplacements}`);
console.log('Done!');

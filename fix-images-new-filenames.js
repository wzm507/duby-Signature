import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesNewPath = path.join(__dirname, 'images_new');

console.log('Starting image filename fix in images_new directory...');

function renameFilesInDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      renameFilesInDir(fullPath);
    } else if (entry.name.includes('image copy')) {
      let newName = entry.name.replace(/image copy(\s*\d*)\.png/, (match, num) => {
        if (num.trim() === '') {
          return 'image-copy.png';
        } else {
          return `image-copy${num.trim()}.png`;
        }
      });
      
      const newPath = path.join(dir, newName);
      
      if (fullPath !== newPath && !fs.existsSync(newPath)) {
        fs.renameSync(fullPath, newPath);
        const relativePath = path.relative(__dirname, fullPath);
        console.log(`Renamed: ${relativePath} -> ${newName}`);
      }
    }
  });
}

if (fs.existsSync(imagesNewPath)) {
  renameFilesInDir(imagesNewPath);
  console.log('Done!');
} else {
  console.log('images_new directory not found');
}

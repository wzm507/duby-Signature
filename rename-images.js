import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

function renameFilesWithSpaces(dir) {
    try {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                renameFilesWithSpaces(filePath);
            } else if (file.includes(' ')) {
                const newFileName = file.replace(/ /g, '-');
                const newFilePath = path.join(dir, newFileName);

                console.log(`Renaming: ${file} -> ${newFileName}`);
                fs.renameSync(filePath, newFilePath);
            }
        });
    } catch (error) {
        console.error(`Error processing ${dir}:`, error.message);
    }
}

const directoriesToProcess = [
    path.join(publicDir, 'off'),
    path.join(publicDir, 'img'),
    path.join(publicDir, 'images_new', 'buy-new'),
    path.join(publicDir, 'Developers'),
    path.join(publicDir, 'Communities'),
    path.join(publicDir, 'aboutus'),
    path.join(publicDir, 'banner'),
    path.join(publicDir, 'Services'),
    path.join(publicDir, 'Terra Gardens'),
    path.join(publicDir, 'Greenridge'),
    path.join(publicDir, 'Lyvia by Palace'),
    path.join(publicDir, 'DAMAC Islands')
];

console.log('Starting file renaming...\n');

directoriesToProcess.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`Processing directory: ${dir}`);
        renameFilesWithSpaces(dir);
    }
});

console.log('\n✓ Renaming completed!');
console.log('\nNext steps:');
console.log('1. Update all HTML files to use new file names');
console.log('2. Run: npm run build');
console.log('3. Commit and push changes');
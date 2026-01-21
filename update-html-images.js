import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

function updateImageReferences(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        content = content.replace(/image copy(\s*)(\d*)\.png/gi, 'image-copy$1$2.png');
        content = content.replace(/image copy(\s*)(\d*)\.jpg/gi, 'image-copy$1$2.jpg');
        content = content.replace(/image copy(\s*)(\d*)\.jpeg/gi, 'image-copy$1$2.jpeg');
        content = content.replace(/Screenshot 2023-10-25 at 14\.02\.25 \((\d+)\)\.png/gi, 'Screenshot-2023-10-25-at-14.02.25-($1).png');
        content = content.replace(/Screenshot 2023-10-27 at 09\.43\.23 \((\d+)\)\.png/gi, 'Screenshot-2023-10-27-at-09.43.23-($1).png');
        content = content.replace(/team 拷贝\.jpg/gi, 'team-拷贝.jpg');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Updated: ${path.basename(filePath)}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return false;
    }
}

function processDirectory(dir) {
    try {
        const files = fs.readdirSync(dir);
        let updatedCount = 0;

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                updatedCount += processDirectory(filePath);
            } else if (file.endsWith('.html')) {
                if (updateImageReferences(filePath)) {
                    updatedCount++;
                }
            }
        });

        return updatedCount;
    } catch (error) {
        console.error(`Error processing directory ${dir}:`, error.message);
        return 0;
    }
}

console.log('Updating HTML files with new image names...\n');

const totalUpdated = processDirectory(publicDir);

console.log(`\n✓ Completed! Updated ${totalUpdated} HTML files.`);
console.log('\nNext steps:');
console.log('1. Run: npm run build');
console.log('2. Commit and push changes');
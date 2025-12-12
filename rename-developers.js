const fs = require('fs');
const path = require('path');

// Define the path to the Developers directory
const developersDir = path.join(__dirname, 'public', 'Developers');

console.log('Working directory:', __dirname);
console.log('Developers directory:', developersDir);

// Read all files in the directory
fs.readdir(developersDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter and sort PNG files numerically
  const pngFiles = files
    .filter(file => file.toLowerCase().endsWith('.png'))
    .sort((a, b) => {
      // Extract numbers from filenames
      const numA = parseInt(a.match(/\d+/)[0], 10);
      const numB = parseInt(b.match(/\d+/)[0], 10);
      return numA - numB;
    });

  console.log('Found PNG files:', pngFiles);

  // Rename files to 1-28
  pngFiles.slice(0, 28).forEach((file, index) => {
    const newName = `${index + 1}.png`;
    const oldPath = path.join(developersDir, file);
    const newPath = path.join(developersDir, newName);

    console.log(`Renaming ${file} to ${newName}`);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Error renaming ${file}:`, err);
      }
    });
  });

  console.log('Renaming process started. Check console for individual file status.');
});

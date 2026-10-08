const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'ananya.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// We have /img1.jpg to /img16.jpg in public folder
const publicImages = [];
for (let i = 1; i <= 16; i++) {
  publicImages.push(`/img${i}.jpg`);
}

let imageIndex = 0;
const getNextImage = () => {
  const img = publicImages[imageIndex];
  imageIndex = (imageIndex + 1) % publicImages.length;
  return img;
};

// Recursive function to replace any string starting with "http"
function traverseAndReplace(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      if (obj[key].startsWith('http')) {
        obj[key] = getNextImage();
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      traverseAndReplace(obj[key]);
    }
  }
}

traverseAndReplace(data);

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("Images updated successfully in ananya.json");

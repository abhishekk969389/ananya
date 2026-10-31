const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Target strictly 39 KB (safety margin below 40 KB = 40960 bytes)
const MAX_ALLOWED_BYTES = 40960; // 40 KB
const TARGET_SIZE_BYTES = 39 * 1024; // 39 KB (~39936 bytes)

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BACKUP_DIR = path.join(__dirname, '..', 'public_backup_original');

const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function compressImageFile(publicFilePath) {
  const relPath = path.relative(PUBLIC_DIR, publicFilePath).replace(/\\/g, '/');
  const ext = path.extname(publicFilePath).toLowerCase();
  const currentPublicStat = fs.statSync(publicFilePath);
  const currentPublicSize = currentPublicStat.size;

  // Rule 2: Jo images pehle se < 40KB (strictly <= MAX_ALLOWED_BYTES) hain, unhe mat chhedo
  // (brand/b1-b8, tes/t1.jpg etc.)
  if (currentPublicSize <= MAX_ALLOWED_BYTES) {
    let imgDim = { width: '?', height: '?' };
    try {
      const meta = await sharp(publicFilePath).metadata();
      imgDim = { width: meta.width, height: meta.height };
    } catch (e) {}
    return {
      before: currentPublicSize,
      after: currentPublicSize,
      dimensions: `${imgDim.width}x${imgDim.height}`,
      status: 'Skipped (Already <40KB)'
    };
  }

  // Rule 3: Compression hamesha public_backup_original/ ke ORIGINAL se karo,
  // public ki already-compressed copy se nahi. Sirf banner1.jpg ke liye current public/banner1.jpg input hoga.
  let inputPath = path.join(BACKUP_DIR, relPath);
  if (!fs.existsSync(inputPath)) {
    if (fs.existsSync(publicFilePath)) {
      inputPath = publicFilePath;
    } else {
      throw new Error(`Original file not found for ${relPath}`);
    }
  }

  const originalStat = fs.statSync(inputPath);
  const originalSize = originalStat.size;

  // Sharp instance with limitInputPixels: false for huge images (img8, img9)
  const inputBuffer = fs.readFileSync(inputPath);
  const baseSharp = () => sharp(inputBuffer, { limitInputPixels: false });

  const metadata = await baseSharp().metadata();
  let baseWidth = metadata.width || 1200;

  // Rule 4: Pehle bade images (width > 1600) ko 1600px wide par resize karo (withoutEnlargement: true)
  if (baseWidth > 1600) {
    baseWidth = 1600;
  }

  let currentWidth = baseWidth;

  const isHeroBanner = relPath.includes('banner') || relPath.startsWith('banner');
  const minWidth = isHeroBanner ? 800 : 480;

  const isPng = ext === '.png';
  const isJpeg = ext === '.jpg' || ext === '.jpeg';
  const isWebp = ext === '.webp';
  const isAvif = ext === '.avif';
  const isGif = ext === '.gif';

  let bestBuffer = null;
  let finalStatus = 'Optimized (<40KB)';

  while (true) {
    let candidateBuffer = null;

    if (isPng) {
      // PNG (banner.png, emoji.png, logo-mainn.png, brand/*.png)
      // palette: true, quality 80 se 40, effort 10, colours 256 se kam karte jao (128, 64), phir resize.
      // logo-mainn.png ki transparency (alpha) bachi rehni chahiye
      let found = false;
      const colourOptions = [256, 128, 64];

      for (const colours of colourOptions) {
        for (let q = 80; q >= 40; q -= 10) {
          let pipeline = baseSharp()
            .rotate()
            .resize({ width: Math.round(currentWidth), withoutEnlargement: true })
            .png({
              palette: true,
              quality: q,
              effort: 10,
              colours: colours
            });

          const buf = await pipeline.toBuffer();
          candidateBuffer = buf;

          if (buf.length <= TARGET_SIZE_BYTES) {
            found = true;
            break;
          }
        }
        if (found) break;
      }
    } else if (isJpeg || isWebp || isAvif) {
      // JPEG: mozjpeg: true, quality 75 se 40 tak step 5 me gir ke dekho.
      let found = false;
      const startQuality = isJpeg ? 75 : 80;

      for (let q = startQuality; q >= 40; q -= 5) {
        let pipeline = baseSharp()
          .rotate()
          .resize({ width: Math.round(currentWidth), withoutEnlargement: true });

        let buf;
        if (isJpeg) {
          buf = await pipeline.jpeg({ quality: q, mozjpeg: true }).toBuffer();
        } else if (isWebp) {
          buf = await pipeline.webp({ quality: q }).toBuffer();
        } else if (isAvif) {
          buf = await pipeline.avif({ quality: q }).toBuffer();
        }

        candidateBuffer = buf;
        if (buf.length <= TARGET_SIZE_BYTES) {
          found = true;
          break;
        }
      }
    } else if (isGif) {
      let pipeline = sharp(inputBuffer, { limitInputPixels: false, animated: true })
        .resize({ width: Math.round(currentWidth), withoutEnlargement: true });
      candidateBuffer = await pipeline.gif().toBuffer();
    } else {
      candidateBuffer = inputBuffer;
    }

    bestBuffer = candidateBuffer;

    if (bestBuffer && bestBuffer.length <= TARGET_SIZE_BYTES) {
      break;
    }

    // Phir bhi > 39KB ho to width 10% kam karo aur loop repeat karo.
    const nextWidth = Math.round(currentWidth * 0.9);
    if (nextWidth < minWidth || nextWidth >= currentWidth) {
      // If we cannot reduce width further under minWidth, check if it's already under 40960 bytes
      if (bestBuffer && bestBuffer.length <= MAX_ALLOWED_BYTES) {
        // Fits under 40 KB!
        break;
      }

      // If still above 40 KB, try dropping below minWidth up to 320px if necessary to guarantee <40KB
      if (nextWidth >= 320 && nextWidth < currentWidth) {
        currentWidth = nextWidth;
        continue;
      }

      finalStatus = `FAILED (>40KB): ${(bestBuffer.length / 1024).toFixed(1)}KB at ${currentWidth}px`;
      break;
    }
    currentWidth = nextWidth;
  }

  // Verify and write to public/
  if (bestBuffer) {
    // Only overwrite if it was produced successfully
    if (bestBuffer.length <= MAX_ALLOWED_BYTES) {
      fs.writeFileSync(publicFilePath, bestBuffer);
      const finalMeta = await sharp(bestBuffer).metadata();
      return {
        before: originalSize,
        after: bestBuffer.length,
        dimensions: `${finalMeta.width}x${finalMeta.height}`,
        status: 'Optimized (<40KB)'
      };
    } else {
      // File could not be brought under 40KB
      const finalMeta = await sharp(bestBuffer).metadata();
      return {
        before: originalSize,
        after: bestBuffer.length,
        dimensions: `${finalMeta.width}x${finalMeta.height}`,
        status: finalStatus
      };
    }
  }

  throw new Error(`Failed to compress ${relPath}`);
}

async function main() {
  console.log('=== Image Compression Script (Target < 40KB) ===\n');

  console.log('[1/4] Checking environment & directories...');
  if (!fs.existsSync(BACKUP_DIR)) {
    console.error('ERROR: public_backup_original directory does not exist!');
    process.exit(1);
  }

  console.log('[2/4] Scanning public/ directory...');
  const allFiles = getFiles(PUBLIC_DIR);
  const imageFiles = allFiles.filter(f => SUPPORTED_EXTS.includes(path.extname(f).toLowerCase()));
  console.log(`Found ${imageFiles.length} images in public/.\n`);

  console.log('[3/4] Compressing images...\n');
  const results = [];
  const failedList = [];

  for (const imgPath of imageFiles) {
    const relPath = path.relative(PUBLIC_DIR, imgPath).replace(/\\/g, '/');
    try {
      const res = await compressImageFile(imgPath);
      results.push({
        file: relPath,
        beforeKB: (res.before / 1024).toFixed(1),
        afterKB: (res.after / 1024).toFixed(1),
        dimensions: res.dimensions,
        status: res.status,
        rawAfter: res.after
      });

      if (res.status.startsWith('FAILED') || res.after > MAX_ALLOWED_BYTES) {
        failedList.push({ file: relPath, sizeKB: (res.after / 1024).toFixed(1) });
        console.log(`✗ FAILED: ${relPath} (${(res.before / 1024).toFixed(1)} KB -> ${(res.after / 1024).toFixed(1)} KB) - ${res.status}`);
      } else {
        console.log(`✓ ${relPath.padEnd(20)}: ${(res.before / 1024).toFixed(1).padStart(7)} KB -> ${(res.after / 1024).toFixed(1).padStart(5)} KB (${res.dimensions}) [${res.status}]`);
      }
    } catch (err) {
      console.error(`✗ Error processing ${relPath}:`, err.message);
      results.push({
        file: relPath,
        beforeKB: 'Error',
        afterKB: 'Error',
        dimensions: 'Error',
        status: `Error: ${err.message}`,
        rawAfter: Infinity
      });
      failedList.push({ file: relPath, sizeKB: 'Error' });
    }
  }

  console.log('\n[4/4] Verification & Summary Table:');
  console.log('-------------------------------------------------------------------------------------------------------------------');
  console.log(`| ${'File Path'.padEnd(25)} | ${'Before'.padStart(12)} | ${'After'.padStart(10)} | ${'Dimensions'.padStart(14)} | ${'Status'.padEnd(30)} |`);
  console.log('-------------------------------------------------------------------------------------------------------------------');
  for (const r of results) {
    console.log(`| ${r.file.padEnd(25)} | ${(r.beforeKB + ' KB').padStart(12)} | ${(r.afterKB + ' KB').padStart(10)} | ${r.dimensions.padStart(14)} | ${r.status.padEnd(30)} |`);
  }
  console.log('-------------------------------------------------------------------------------------------------------------------');

  console.log('\n--- SUMMARY ---');
  const optimizedCount = results.filter(r => r.status.includes('Optimized')).length;
  const skippedCount = results.filter(r => r.status.includes('Skipped')).length;
  console.log(`Total images scanned: ${results.length}`);
  console.log(`Compressed & Optimized: ${optimizedCount}`);
  console.log(`Skipped (already < 40KB): ${skippedCount}`);

  if (failedList.length > 0) {
    console.log(`\n❌ FAILED Images (${failedList.length}):`);
    failedList.forEach(f => console.log(`  - ${f.file}: ${f.sizeKB} KB`));
  } else {
    console.log('\n✅ ALL IMAGES ARE STRICTLY UNDER 40 KB (40960 BYTES)!');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_SIZE_BYTES = 50 * 1024; // 50 KB
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BACKUP_DIR = path.join(__dirname, '..', 'public_backup_original');

const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

// 1. Recursive file finder
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

// 2. Backup creator
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 3. Compression logic according to rules
async function compressImage(filePath) {
  const stat = fs.statSync(filePath);
  const originalSize = stat.size;
  const ext = path.extname(filePath).toLowerCase();

  // Jo pehle se 50KB se choti hai, use mat chhedo
  if (originalSize <= TARGET_SIZE_BYTES) {
    return {
      before: originalSize,
      after: originalSize,
      status: 'Skipped (Already <50KB)'
    };
  }

  const inputBuffer = fs.readFileSync(filePath);
  const metadata = await sharp(inputBuffer).metadata();

  let originalWidth = metadata.width || 1200;
  let currentWidth = originalWidth;

  let bestBuffer = null;
  let finalStatus = 'Compressed';

  // Strategy loop:
  // Step 1: Lower quality (for jpeg/webp/avif: 80 down to 40 in steps of 5)
  // Step 2: If still > 50KB, reduce width by 10% steps, down to min 400px
  // For PNG: compressionLevel: 9, palette: true, then scale down width if needed

  const isPng = ext === '.png';
  const isJpeg = ext === '.jpg' || ext === '.jpeg';
  const isWebp = ext === '.webp';
  const isAvif = ext === '.avif';
  const isGif = ext === '.gif';

  // Outer loop: reduce width (10% step) if needed
  while (true) {
    let candidateBuffer = null;

    if (isPng) {
      // First try palette: true, compressionLevel: 9
      let pipeline = sharp(inputBuffer)
        .rotate() // auto rotate based on EXIF before stripping
        .withMetadata(false);

      if (currentWidth < originalWidth) {
        pipeline = pipeline.resize({ width: Math.round(currentWidth), withoutEnlargement: true });
      }

      candidateBuffer = await pipeline
        .png({ compressionLevel: 9, palette: true, quality: 80 })
        .toBuffer();

      if (candidateBuffer.length > TARGET_SIZE_BYTES) {
        // Try lowering quality on png palette
        for (let q = 75; q >= 40; q -= 5) {
          let testPipe = sharp(inputBuffer)
            .rotate()
            .withMetadata(false);
          if (currentWidth < originalWidth) {
            testPipe = testPipe.resize({ width: Math.round(currentWidth), withoutEnlargement: true });
          }
          const buf = await testPipe.png({ compressionLevel: 9, palette: true, quality: q }).toBuffer();
          if (buf.length <= TARGET_SIZE_BYTES || q === 40) {
            candidateBuffer = buf;
            if (buf.length <= TARGET_SIZE_BYTES) break;
          }
        }
      }
    } else if (isJpeg || isWebp || isAvif) {
      // Quality step from 80 down to 40
      for (let q = 80; q >= 40; q -= 5) {
        let pipeline = sharp(inputBuffer)
          .rotate()
          .withMetadata(false);

        if (currentWidth < originalWidth) {
          pipeline = pipeline.resize({ width: Math.round(currentWidth), withoutEnlargement: true });
        }

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
          break;
        }
      }
    } else if (isGif) {
      // GIF processing
      let pipeline = sharp(inputBuffer, { animated: true })
        .withMetadata(false);
      if (currentWidth < originalWidth) {
        pipeline = pipeline.resize({ width: Math.round(currentWidth) });
      }
      candidateBuffer = await pipeline.gif().toBuffer();
    } else {
      // Fallback
      candidateBuffer = inputBuffer;
    }

    bestBuffer = candidateBuffer;

    if (bestBuffer.length <= TARGET_SIZE_BYTES) {
      break;
    }

    // Still > 50KB: reduce width by 10%
    const nextWidth = Math.round(currentWidth * 0.9);
    if (nextWidth < 400 || nextWidth === currentWidth) {
      // Cannot reduce below 400px
      finalStatus = `Warning: Best size ${(bestBuffer.length / 1024).toFixed(1)}KB at min width ${Math.max(400, currentWidth)}px`;
      break;
    }
    currentWidth = nextWidth;
  }

  // Write compressed image
  if (bestBuffer && bestBuffer.length < originalSize) {
    fs.writeFileSync(filePath, bestBuffer);
    return {
      before: originalSize,
      after: bestBuffer.length,
      status: bestBuffer.length <= TARGET_SIZE_BYTES ? 'Optimized (<50KB)' : finalStatus
    };
  } else {
    return {
      before: originalSize,
      after: originalSize,
      status: 'No reduction possible'
    };
  }
}

async function main() {
  console.log('=== Image Compression Script ===\n');

  // Step 2: Backup public folder
  console.log(`[1/4] Checking backup in "${path.relative(process.cwd(), BACKUP_DIR)}"...`);
  if (!fs.existsSync(BACKUP_DIR)) {
    console.log('Creating backup of public/ ...');
    copyRecursiveSync(PUBLIC_DIR, BACKUP_DIR);
    console.log('Backup created successfully.');
  } else {
    console.log('Backup already exists. Skipping backup step to prevent overwriting originals.');
  }

  // Step 1: Scan files
  console.log('\n[2/4] Scanning public/ directory...');
  const allFiles = getFiles(PUBLIC_DIR);
  const imageFiles = allFiles.filter(f => SUPPORTED_EXTS.includes(path.extname(f).toLowerCase()));

  console.log(`Found ${imageFiles.length} images in total.\n`);

  // Step 3 & 4: Process images
  console.log('[3/4] Compressing images...\n');
  const results = [];

  for (const imgPath of imageFiles) {
    const relPath = path.relative(PUBLIC_DIR, imgPath).replace(/\\/g, '/');
    try {
      const res = await compressImage(imgPath);
      results.push({
        file: relPath,
        beforeKB: (res.before / 1024).toFixed(1),
        afterKB: (res.after / 1024).toFixed(1),
        status: res.status
      });
      console.log(`✓ Processed: ${relPath} (${(res.before / 1024).toFixed(1)} KB -> ${(res.after / 1024).toFixed(1)} KB) - ${res.status}`);
    } catch (err) {
      console.error(`✗ Error processing ${relPath}:`, err.message);
      results.push({
        file: relPath,
        beforeKB: 'Error',
        afterKB: 'Error',
        status: `Error: ${err.message}`
      });
    }
  }

  // Step 5: Print Summary Table
  console.log('\n[4/4] Final Results Table:');
  console.log('---------------------------------------------------------------------------------------------------------');
  console.log(`| ${'File Path'.padEnd(30)} | ${'Before'.padStart(10)} | ${'After'.padStart(10)} | ${'Status'.padEnd(35)} |`);
  console.log('---------------------------------------------------------------------------------------------------------');
  for (const r of results) {
    console.log(`| ${r.file.padEnd(30)} | ${(r.beforeKB + ' KB').padStart(10)} | ${(r.afterKB + ' KB').padStart(10)} | ${r.status.padEnd(35)} |`);
  }
  console.log('---------------------------------------------------------------------------------------------------------');

  // Step 6: Verification
  const stillAbove50KB = results.filter(r => parseFloat(r.afterKB) > 50);
  if (stillAbove50KB.length === 0) {
    console.log('\n SUCCESS: Saari images 50KB ke andar optimize ho gayi hain!');
  } else {
    console.log(`\n ATTENTION: ${stillAbove50KB.length} image(s) 50KB se badi hain (min width limit 400px reached):`);
    stillAbove50KB.forEach(img => console.log(`  - ${img.file} (${img.afterKB} KB)`));
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

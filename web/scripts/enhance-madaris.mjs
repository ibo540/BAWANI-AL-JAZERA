/**
 * Enhances مجمعين مدارس (Two Schools Complex) project images for a more professional look.
 * Run from web folder: node scripts/enhance-madaris.mjs
 * Requires: Place madaris-1.png … madaris-8.png in public/projects/, then: npm install sharp --save-dev --legacy-peer-deps
 *
 * Applies: normalize (contrast), saturation boost, sharpen.
 */

import sharp from 'sharp';
import { mkdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'projects');

async function enhance(srcPath, outPath) {
  await sharp(srcPath)
    .normalize()
    .modulate({ saturation: 1.2 })
    .sharpen({ sigma: 1.2 })
    .png({ quality: 90 })
    .toFile(outPath);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (let i = 1; i <= 8; i++) {
    const name = `madaris-${i}.png`;
    const path = join(OUT_DIR, name);
    try {
      await access(path);
      const outTmp = join(OUT_DIR, `madaris-${i}.enhanced.png`);
      await enhance(path, outTmp);
      const { rename } = await import('fs/promises');
      await rename(outTmp, path);
      console.log(`Enhanced ${name}`);
    } catch (e) {
      if (e.code === 'ENOENT') console.warn(`Skip ${name} (not found). Copy images to public/projects/ first.`);
      else console.error(`${name}:`, e.message);
    }
  }
  console.log('Done.');
}

main();

/**
 * 将 public/1.jpg … 6.jpg 压成适合手风琴卡片展示的体积（最大宽 800px，与 UI 400px@2x 一致）
 * 用法：node scripts/compress-accordion-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const MAX_WIDTH = 800;
const JPEG_QUALITY = 82;

async function compressOne(filename) {
  const inputPath = path.join(publicDir, filename);
  if (!fs.existsSync(inputPath)) {
    console.warn(`跳过（不存在）: ${filename}`);
    return;
  }

  const before = fs.statSync(inputPath).size;
  const tmpPath = path.join(publicDir, `${filename}.tmp`);

  await sharp(inputPath)
    .rotate()
    .resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(tmpPath);

  fs.renameSync(tmpPath, inputPath);
  const after = fs.statSync(inputPath).size;
  console.log(
    `${filename}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB（-${(((before - after) / before) * 100).toFixed(1)}%）`,
  );
}

async function main() {
  console.log(`输出目录: ${publicDir}\n最大宽度: ${MAX_WIDTH}px, JPEG 质量: ${JPEG_QUALITY}\n`);
  for (let i = 1; i <= 6; i++) {
    await compressOne(`${i}.jpg`);
  }
  console.log("\n完成。");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

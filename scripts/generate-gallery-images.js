import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';

const publicDir = resolve(process.cwd(), 'public');
const outputFile = resolve(process.cwd(), 'src', 'app', 'magyar', 'picture-list.ts');
const prefix = 'arnyas_apartman';
const allowedExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

if (!existsSync(publicDir)) {
  console.error(`Public directory not found: ${publicDir}`);
  process.exit(1);
}

const files = readdirSync(publicDir, { withFileTypes: true })
  .filter((dirent) => dirent.isFile())
  .map((dirent) => dirent.name)
  .filter((name) => {
    const ext = extname(name).toLowerCase();
    return name.startsWith(prefix) && allowedExt.includes(ext);
  })
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const fileContents = `/* This file is generated from public/ by scripts/generate-gallery-images.js */
export const GALLERY_PICTURES: string[] = [
${files.map((name) => `  ${JSON.stringify(name)},`).join('\n')}
];
`;

writeFileSync(outputFile, fileContents, 'utf8');
console.log(`Generated ${files.length} gallery pictures in ${outputFile}`);

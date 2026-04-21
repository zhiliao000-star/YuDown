import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');

await fs.rm(distDir, { recursive: true, force: true });
await fs.mkdir(distDir, { recursive: true });
await fs.copyFile(path.join(root, 'index.html'), path.join(distDir, 'index.html'));

console.log('Built static site into dist/');

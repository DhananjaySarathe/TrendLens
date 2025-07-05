import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Compile TypeScript files
try {
  execSync('npx tsc --outDir dist', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation completed');
} catch (error) {
  console.error('❌ TypeScript compilation failed:', error.message);
  process.exit(1);
}

// Copy manifest.json
fs.copyFileSync('manifest.json', path.join(distDir, 'manifest.json'));

// Copy popup HTML
const popupDir = path.join(distDir, 'popup');
if (!fs.existsSync(popupDir)) {
  fs.mkdirSync(popupDir, { recursive: true });
}
fs.copyFileSync('popup/index.html', path.join(popupDir, 'index.html'));

// Copy public assets
const publicDir = path.join(distDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (fs.existsSync('public/icon.png')) {
  fs.copyFileSync('public/icon.png', path.join(publicDir, 'icon.png'));
}

console.log('✅ Build completed! Extension ready in dist/ folder');
console.log('📁 Load the dist/ folder in Chrome as an unpacked extension'); 
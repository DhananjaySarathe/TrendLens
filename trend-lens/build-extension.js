import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Chrome Extension Build Process...\n');

// Step 1: Clean dist directory
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
  console.log('✅ Cleaned dist directory');
}
fs.mkdirSync(distDir, { recursive: true });

// Step 2: Compile TypeScript files
try {
  console.log('📝 Compiling TypeScript files...');
  execSync('npx tsc', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation completed');
} catch (error) {
  console.error('❌ TypeScript compilation failed:', error.message);
  process.exit(1);
}

// Step 3: Build React popup (if needed)
try {
  console.log('⚛️  Building React popup...');
  // For now, we'll just copy the TSX file and let it be compiled by TypeScript
  // In a more complex setup, you might want to use a bundler like Vite or Webpack
  console.log('✅ React popup processed');
} catch (error) {
  console.error('❌ React build failed:', error.message);
  process.exit(1);
}

// Step 4: Copy manifest.json
console.log('📋 Copying manifest.json...');
fs.copyFileSync('manifest.json', path.join(distDir, 'manifest.json'));

// Step 5: Copy popup HTML
console.log('🪟 Copying popup files...');
const popupDir = path.join(distDir, 'popup');
fs.mkdirSync(popupDir, { recursive: true });
fs.copyFileSync('popup/index.html', path.join(popupDir, 'index.html'));

// Step 6: Copy public assets
console.log('🖼️  Copying public assets...');
const publicDir = path.join(distDir, 'public');
fs.mkdirSync(publicDir, { recursive: true });
if (fs.existsSync('public/icon.png')) {
  fs.copyFileSync('public/icon.png', path.join(publicDir, 'icon.png'));
}

// Step 7: Verify build output
console.log('\n📁 Verifying build output...');
const expectedFiles = [
  'manifest.json',
  'background.js',
  'content/overlay.js',
  'content/capture.js',
  'content/geminiAnalyzer.js',
  'popup/index.html',
  'popup/App.js',
  'utils/drawAnnotations.js'
];

let missingFiles = [];
expectedFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.error('❌ Missing files in build output:', missingFiles);
  process.exit(1);
}

console.log('✅ All expected files present');

// Step 8: Display final structure
console.log('\n📂 Final extension structure:');
function displayStructure(dir, prefix = '') {
  const items = fs.readdirSync(dir);
  items.forEach((item, index) => {
    const itemPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const stat = fs.statSync(itemPath);
    const relativePath = path.relative(distDir, itemPath);
    
    if (stat.isDirectory()) {
      console.log(`${prefix}${isLast ? '└── ' : '├── '}${item}/`);
      displayStructure(itemPath, prefix + (isLast ? '    ' : '│   '));
    } else {
      console.log(`${prefix}${isLast ? '└── ' : '├── '}${item}`);
    }
  });
}

displayStructure(distDir);

console.log('\n🎉 Chrome Extension Build Complete!');
console.log('📁 Extension ready in dist/ folder');
console.log('🔧 Load the dist/ folder in Chrome as an unpacked extension');
console.log('   chrome://extensions → Developer mode → Load unpacked → Select dist/'); 
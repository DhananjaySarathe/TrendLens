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

// Step 2: Compile TypeScript files (background, content, utils)
try {
  console.log('📝 Compiling TypeScript files...');
  execSync('npx tsc', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation completed');
} catch (error) {
  console.error('❌ TypeScript compilation failed:', error.message);
  process.exit(1);
}

// Step 3: Build React popup with Vite
try {
  console.log('⚛️  Building React popup with Vite...');
  execSync('npx vite build', { stdio: 'inherit' });
  // Move dist/index.html to dist/popup/index.html
  const popupHtmlSrc = path.join(distDir, 'index.html');
  const popupHtmlDestDir = path.join(distDir, 'popup');
  const popupHtmlDest = path.join(popupHtmlDestDir, 'index.html');
  if (fs.existsSync(popupHtmlSrc)) {
    fs.mkdirSync(popupHtmlDestDir, { recursive: true });
    fs.renameSync(popupHtmlSrc, popupHtmlDest);
    console.log('✅ Moved popup HTML to dist/popup/index.html');
  }
  console.log('✅ React popup built with Vite');
} catch (error) {
  console.error('❌ React popup build failed:', error.message);
  process.exit(1);
}

// Step 4: Copy manifest.json
console.log('📋 Copying manifest.json...');
fs.copyFileSync('manifest.json', path.join(distDir, 'manifest.json'));

// Step 5: Copy content CSS files
console.log('🎨 Copying content CSS files...');
const contentDir = path.join(distDir, 'content');
if (fs.existsSync('content/overlay.css')) {
  fs.copyFileSync('content/overlay.css', path.join(contentDir, 'overlay.css'));
}



// Step 6: Copy public assets
console.log('🖼️  Copying public assets...');
if (fs.existsSync('public/icon.png')) {
  fs.copyFileSync('public/icon.png', path.join(distDir, 'icon.png'));
}

// Step 7: Verify build output
console.log('\n📁 Verifying build output...');
const expectedFiles = [
  'manifest.json',
  'background.js',
  'content/overlay.js',
  'content/overlay.css',
  'content/capture.js',
  'content/geminiAnalyzer.js',
  'popup/index.html',
  'popup/popup.js',
  'utils/drawAnnotations.js',
  'icon.png'
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

// Step 7.5: Clean up unwanted files
console.log('🧹 Cleaning up unwanted files...');
const unwantedFiles = ['.DS_Store'];
function removeUnwantedFiles(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      removeUnwantedFiles(itemPath);
    } else if (unwantedFiles.includes(item)) {
      fs.unlinkSync(itemPath);
      console.log(`   Removed: ${path.relative(distDir, itemPath)}`);
    }
  });
}
removeUnwantedFiles(distDir);

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
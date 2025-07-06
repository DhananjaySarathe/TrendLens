# TrendLens Frontend - Environment Setup Guide

## 📋 Prerequisites

### Required Software
- **Node.js** - Version 16.0.0 or higher
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** - Version 7.0.0 or higher (comes with Node.js)
  - Verify installation: `npm --version`

- **Google Chrome** - Latest version
  - Download from: https://www.google.com/chrome/

### Required API Keys
- **Google Gemini API Key**
  - Get from: https://makersuite.google.com/app/apikey
  - Required for AI-powered chart pattern analysis
  - Free tier available with usage limits

## 🚀 Installation Steps

### 1. Clone and Setup
```bash
# Navigate to the frontend directory
cd FE

# Install dependencies
npm install
```

### 2. Environment Configuration
No environment file needed for the frontend - API keys are managed through the Chrome extension popup interface.

### 3. Build the Extension
```bash
# Build the complete Chrome extension
npm run build:extension

# Alternative: Simple TypeScript compilation
npm run build

# Development mode (watch for changes)
npm run dev
```

### 4. Load Extension in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist/` folder from this project
5. The TrendLens extension should appear in your toolbar

## 🛠️ Development Environment

### Project Structure
```
FE/
├── content/                 # Content scripts
│   ├── overlay.ts          # Selection overlay
│   ├── capture.ts          # Screen capture
│   ├── geminiAnalyzer.ts   # AI analysis
│   └── overlay.css         # Overlay styling
├── popup/                  # Extension popup
│   ├── App.tsx            # React main component
│   ├── main.tsx           # Entry point
│   ├── index.html         # Popup HTML
│   └── tailwind.css       # Tailwind utilities
├── utils/                  # Utility functions
│   └── drawAnnotations.ts # Annotation rendering
├── public/                 # Static assets
│   ├── icons/             # Extension icons
│   └── icon.png           # Main icon
├── dist/                   # Built extension (generated)
├── manifest.json           # Extension configuration
├── background.ts           # Service worker
└── build-extension.js      # Build script
```

### Available Scripts
- `npm run build:extension` - Complete production build
- `npm run build` - TypeScript compilation only
- `npm run dev` - Watch mode for development

### Technology Stack
- **React 18** - UI framework for popup
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling (local setup)
- **Vite** - Fast build tool and bundler
- **html2canvas** - Screen capture functionality
- **Chrome Extensions API** - Browser integration

## 🔧 Configuration

### TypeScript Configuration
The project uses TypeScript with the following key settings:
- Target: ES2020
- Module: ESNext
- JSX: react-jsx
- Strict mode enabled
- Chrome types included

### Tailwind CSS Setup
- Uses local Tailwind CSS file (not CDN)
- Avoids Chrome extension CSP restrictions
- Imported in main.tsx for Vite processing
- Includes all necessary utility classes

### Chrome Extension Manifest
- Manifest V3 compliant
- Permissions: scripting, activeTab, storage
- Content scripts for overlay functionality
- Service worker for background tasks

## 🧪 Testing

### Extension Testing
1. Build the extension: `npm run build:extension`
2. Load in Chrome extensions page
3. Test popup functionality:
   - API key input and storage
   - UI responsiveness
   - Error handling
4. Test content scripts:
   - Overlay selection on web pages
   - Screen capture functionality
   - AI analysis integration

### Debug Tools
- **Chrome DevTools** - For popup debugging
- **Extension Console** - `chrome://extensions` → Details → Inspect views
- **Network Tab** - Monitor API calls to Gemini
- **TypeScript Compiler** - Real-time error checking

## 🔐 Security & Privacy

### API Key Management
- API keys stored in Chrome's local storage
- Never transmitted except to Google's Gemini API
- Secure storage using Chrome Storage API
- No server-side storage or logging

### Permissions
- **activeTab** - Access current tab for screen capture
- **scripting** - Inject content scripts for overlay
- **storage** - Store API key securely

## 🚨 Troubleshooting

### Common Issues
1. **Build Errors**
   - Ensure Node.js version is 16+
   - Delete `node_modules` and run `npm install`
   - Check TypeScript configuration

2. **Extension Loading Issues**
   - Verify all files in `dist/` folder
   - Check Chrome developer mode is enabled
   - Look for errors in extension console

3. **Tailwind Styles Not Applied**
   - Ensure CSS is imported in `main.tsx`
   - Check Vite build includes CSS file
   - Verify no CSP violations

4. **API Integration Issues**
   - Verify Gemini API key is valid
   - Check network connectivity
   - Monitor network tab for API calls

### Build Verification
The build script automatically verifies:
- All TypeScript files compiled
- React popup bundled correctly
- All assets copied to dist/
- No missing dependencies
- Clean file structure

## 📚 Additional Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Google Gemini API](https://ai.google.dev/)

## 🤝 Development Workflow

1. Make changes to source files
2. Run `npm run dev` for watch mode
3. Test changes by reloading extension
4. Build with `npm run build:extension`
5. Test final build before deployment

**Happy developing! 🚀** 
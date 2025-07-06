# TrendLens - Complete Project Setup Guide

> **AI-powered chart pattern detection system with Chrome extension frontend and Node.js backend**

## 🏗️ Project Architecture

```
TrendLens/
├── FE/                    # Chrome Extension Frontend
│   ├── content/          # Content scripts for web pages
│   ├── popup/            # Extension popup (React + TypeScript)
│   ├── utils/            # Utility functions
│   ├── public/           # Static assets and icons
│   ├── dist/             # Built extension (generated)
│   ├── SETUP.md          # Frontend setup guide
│   └── package.json      # Frontend dependencies
│
├── BE/                    # Node.js Backend API
│   ├── src/              # Backend source code
│   ├── tests/            # API tests
│   ├── logs/             # Application logs
│   ├── .env.example      # Environment template
│   ├── SETUP.md          # Backend setup guide
│   └── package.json      # Backend dependencies
│
├── .git/                  # Git repository
├── .gitignore             # Root gitignore
└── PROJECT_SETUP.md       # This file
```

## 🚀 Quick Start (Both Frontend & Backend)

### Prerequisites
- **Node.js 16+** - [Download here](https://nodejs.org/)
- **Google Chrome** - [Download here](https://www.google.com/chrome/)
- **Gemini API Key** - [Get here](https://makersuite.google.com/app/apikey)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/TrendLens.git
cd TrendLens
```

### 2. Setup Frontend (Chrome Extension)
```bash
# Navigate to frontend
cd FE

# Install dependencies
npm install

# Build extension
npm run build:extension

# Load in Chrome:
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the FE/dist/ folder
```

### 3. Setup Backend (API Server)
```bash
# Navigate to backend
cd ../BE

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your API keys
nano .env  # or use your preferred editor

# Start development server
npm run dev
```

## 🔧 Environment Configuration

### Frontend Environment
- **No .env file needed** - API keys managed through extension popup
- **Gemini API Key** - Enter through extension interface
- **Chrome Developer Mode** - Required for loading unpacked extension

### Backend Environment
Create `BE/.env` file with:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Required: Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Database (if implementing persistence)
DATABASE_URL=your_database_connection_string

# Optional: Security & CORS
ALLOWED_ORIGINS=http://localhost:3000
JWT_SECRET=your_jwt_secret_here

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📋 Development Workflow

### Frontend Development
```bash
cd FE

# Development mode (watch for changes)
npm run dev

# Build for testing
npm run build:extension

# Reload extension in Chrome after changes
```

### Backend Development
```bash
cd BE

# Development mode (auto-restart)
npm run dev

# Run tests
npm test

# Check API health
curl http://localhost:3000/api/health
```

## 🧪 Testing the Complete System

### 1. Verify Backend is Running
```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Expected response:
# {"status":"ok","timestamp":"...","uptime":...}
```

### 2. Verify Extension is Loaded
1. Check Chrome extensions page (`chrome://extensions/`)
2. Ensure TrendLens is enabled
3. Click extension icon in toolbar
4. Enter Gemini API key in popup

### 3. Test Chart Analysis
1. Navigate to any webpage with charts
2. Click TrendLens extension icon
3. Click "Start Chart Analysis"
4. Select chart area on webpage
5. Wait for AI analysis results

## 🔄 Integration Points

### Frontend → Backend Communication
- **Chart Analysis**: Extension sends captured images to backend API
- **Pattern Detection**: Backend processes images with Gemini AI
- **Results Display**: Frontend receives and displays analysis results

### API Endpoints
```javascript
// Backend provides these endpoints for frontend
POST /api/analysis/chart    // Analyze chart image
GET  /api/health           // Health check
POST /api/classify         // Classify chart type
```

## 📁 File Structure Details

### Frontend Key Files
```
FE/
├── manifest.json          # Extension configuration
├── background.ts          # Service worker
├── content/
│   ├── overlay.ts        # Selection overlay
│   ├── capture.ts        # Screen capture
│   └── geminiAnalyzer.ts # AI integration
├── popup/
│   ├── App.tsx           # Main React component
│   └── main.tsx          # Entry point
└── build-extension.js    # Build script
```

### Backend Key Files
```
BE/
├── src/
│   ├── server.js         # Express server
│   ├── app.js            # App configuration
│   ├── chartClassifier.js # Chart analysis
│   └── controllers/      # Route handlers
├── .env                  # Environment variables
└── package.json          # Dependencies
```

## 🚨 Common Issues & Solutions

### Frontend Issues
1. **Extension not loading**
   - Verify `dist/` folder exists
   - Check Chrome developer mode is enabled
   - Look for errors in extension console

2. **Tailwind styles not working**
   - Ensure CSS is imported in `main.tsx`
   - Check build includes CSS file
   - Verify no CSP violations

3. **TypeScript compilation errors**
   - Check `tsconfig.json` paths
   - Verify import statements
   - Run `npm run build:extension`

### Backend Issues
1. **Port already in use**
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

2. **Environment variables not loading**
   - Verify `.env` file exists in BE directory
   - Check file permissions
   - No spaces around `=` in .env

3. **API key issues**
   - Verify Gemini API key is valid
   - Check API quota and billing
   - Test with simple API request

### Integration Issues
1. **CORS errors**
   - Update `ALLOWED_ORIGINS` in backend .env
   - Verify frontend URL matches exactly

2. **API communication failures**
   - Check backend server is running
   - Verify API endpoints are correct
   - Monitor network tab for errors

## 🔐 Security Considerations

### Frontend Security
- API keys stored in Chrome's secure storage
- No external script dependencies (local Tailwind)
- Content Security Policy compliant

### Backend Security
- Environment variables for secrets
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection

## 📚 Additional Resources

### Documentation
- [Frontend Setup Guide](FE/SETUP.md) - Detailed frontend instructions
- [Backend Setup Guide](BE/SETUP.md) - Detailed backend instructions
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Google Gemini API Documentation](https://ai.google.dev/)

### Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite, Chrome Extensions API
- **Backend**: Node.js, Express.js, Gemini AI API
- **Tools**: npm, Git, Chrome DevTools

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes in appropriate directory (FE/ or BE/)
4. Test changes thoroughly
5. Update documentation if needed
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Ready to analyze charts with AI! 📊🚀**

For detailed setup instructions, see:
- [Frontend Setup Guide](FE/SETUP.md)
- [Backend Setup Guide](BE/SETUP.md) 
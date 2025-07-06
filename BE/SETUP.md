# TrendLens Backend - Environment Setup Guide

## 📋 Prerequisites

### Required Software
- **Node.js** - Version 16.0.0 or higher
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** - Version 7.0.0 or higher (comes with Node.js)
  - Verify installation: `npm --version`

### Required API Keys & Services
- **Google Gemini API Key**
  - Get from: https://makersuite.google.com/app/apikey
  - Required for AI-powered chart analysis
  - Free tier available with usage limits

- **Database** (Optional - if implementing data persistence)
  - **MongoDB** - For document storage
  - **PostgreSQL** - For relational data
  - **SQLite** - For local development

## 🚀 Installation Steps

### 1. Clone and Setup
```bash
# Navigate to the backend directory
cd BE

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the BE directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys
GEMINI_API_KEY=your_gemini_api_key_here

# Database Configuration (if using)
DATABASE_URL=your_database_connection_string
MONGODB_URI=mongodb://localhost:27017/trendlens
POSTGRES_URL=postgresql://username:password@localhost:5432/trendlens

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Security
JWT_SECRET=your_jwt_secret_here
API_SECRET_KEY=your_api_secret_here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# File Upload (if implementing)
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads/
```

### 3. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start

# With specific port
PORT=8080 npm start
```

## 🛠️ Development Environment

### Project Structure
```
BE/
├── src/
│   ├── controllers/         # Route handlers
│   │   ├── chartController.js
│   │   └── analysisController.js
│   ├── middlewares/         # Custom middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── routes/             # API routes
│   │   ├── charts.js
│   │   └── analysis.js
│   ├── services/           # Business logic
│   │   ├── geminiService.js
│   │   └── chartService.js
│   ├── models/             # Data models (if using database)
│   │   └── Chart.js
│   ├── utils/              # Utility functions
│   │   └── helpers.js
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   └── chartClassifier.js  # Chart classification logic
├── tests/                  # Test files
├── logs/                   # Application logs
├── uploads/                # File uploads (if implementing)
├── .env                    # Environment variables
├── .env.example            # Environment template
└── package.json            # Dependencies and scripts
```

### Available Scripts
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix"
  }
}
```

### Technology Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Cors** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Joi** - Data validation
- **Multer** - File upload handling (if needed)
- **Rate Limiting** - API protection

## 🔧 Configuration

### Environment Variables
Create `.env.example` for team reference:
```env
# Copy this file to .env and fill in your values

# Server
PORT=3000
NODE_ENV=development

# API Keys
GEMINI_API_KEY=

# Database (optional)
DATABASE_URL=
MONGODB_URI=
POSTGRES_URL=

# Security
JWT_SECRET=
API_SECRET_KEY=

# CORS
ALLOWED_ORIGINS=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### API Endpoints
```javascript
// Chart Analysis
POST /api/analysis/chart
  - Body: { image: base64_string, options: {} }
  - Response: { patterns: [], confidence: number, recommendations: [] }

// Health Check
GET /api/health
  - Response: { status: "ok", timestamp: string }

// Chart Classification
POST /api/classify
  - Body: { imageData: string }
  - Response: { classification: string, confidence: number }
```

### Middleware Configuration
```javascript
// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS.split(',') }));

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  max: process.env.RATE_LIMIT_MAX_REQUESTS
});
app.use('/api/', limiter);

// Request logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
```

## 🧪 Testing

### API Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Test specific endpoint
curl -X POST http://localhost:3000/api/analysis/chart \
  -H "Content-Type: application/json" \
  -d '{"image": "base64_image_data"}'
```

### Test Structure
```javascript
// Example test file: tests/chart.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Chart Analysis API', () => {
  test('POST /api/analysis/chart', async () => {
    const response = await request(app)
      .post('/api/analysis/chart')
      .send({ image: 'test_base64_data' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('patterns');
  });
});
```

## 🔐 Security & Privacy

### Security Measures
- **Helmet.js** - Security headers
- **CORS** - Cross-origin protection
- **Rate Limiting** - API abuse prevention
- **Input Validation** - Data sanitization
- **Environment Variables** - Secret management

### Data Privacy
- No persistent storage of user images
- API keys securely managed
- Minimal logging of sensitive data
- GDPR compliance considerations

### API Security
```javascript
// Input validation middleware
const validateChartAnalysis = (req, res, next) => {
  const schema = Joi.object({
    image: Joi.string().base64().required(),
    options: Joi.object().optional()
  });
  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port
   lsof -i :3000
   
   # Kill process
   kill -9 <PID>
   
   # Or use different port
   PORT=8080 npm start
   ```

2. **Environment Variables Not Loading**
   - Verify `.env` file exists in BE directory
   - Check file permissions
   - Ensure no spaces around `=` in .env file

3. **API Key Issues**
   - Verify Gemini API key is valid
   - Check API quota and billing
   - Test API key with simple request

4. **CORS Errors**
   - Update `ALLOWED_ORIGINS` in .env
   - Check frontend URL matches exactly
   - Verify CORS middleware configuration

### Debug Tools
- **Postman** - API testing
- **Node Inspector** - Debugging
- **Morgan** - Request logging
- **Console.log** - Simple debugging

### Performance Monitoring
```javascript
// Add response time logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

## 📊 Monitoring & Logging

### Logging Configuration
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/app.log' }),
    new winston.transports.Console()
  ]
});
```

### Health Check Endpoint
```javascript
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version
  });
});
```

## 🚀 Deployment

### Production Setup
1. **Environment Configuration**
   - Set `NODE_ENV=production`
   - Use production database
   - Configure proper CORS origins

2. **Process Management**
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start src/server.js --name "trendlens-api"
   pm2 startup
   pm2 save
   ```

3. **Reverse Proxy (Nginx)**
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location /api {
       proxy_pass http://localhost:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
     }
   }
   ```

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Google Gemini API](https://ai.google.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)

## 🤝 Development Workflow

1. Create feature branch
2. Implement changes with tests
3. Run `npm test` to verify
4. Test API endpoints manually
5. Update documentation if needed
6. Submit pull request

**Happy coding! 🚀** 
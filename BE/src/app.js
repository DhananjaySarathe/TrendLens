import express from 'express';
import cors from 'cors';
import analyzeRoutes from './routes/analyzeRoutes.js';
import { checkRoutes } from './controllers/checkRoutes.js'; // Import the check routes

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Mount your analyze routes under /api
app.use('/api', analyzeRoutes);

// Call the function to get the router, then mount it
app.use('/api', checkRoutes());

export default app;

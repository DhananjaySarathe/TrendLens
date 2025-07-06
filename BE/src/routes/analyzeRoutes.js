import express from 'express';
import analyzeController from '../controllers/analyzeController.js';

import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Route to analyze chart with uploaded image
router.post('/analyze', upload.single('image'), analyzeController.analyzeChart);


export default router;

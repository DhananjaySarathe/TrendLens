// controllers/analyzeController.js
import analyzeImageWithGemini from '../services/geminiService.js';

export const analyzeChart = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const analysisResult = await analyzeImageWithGemini(req.file.buffer);

    // Log the API response to the console
    console.log('Gemini API response:', analysisResult);

    return res.json(analysisResult);
  } catch (error) {
    console.error('Error in analyzeChart:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Export all controller methods as an object by default
export default {
  analyzeChart,
};

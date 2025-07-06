import fetch from 'node-fetch';

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function analyzeImageWithGemini(imageBuffer) {
  const base64Image = imageBuffer.toString('base64');

  const requestPayload = {
    image: { content: base64Image },
    features: [{ type: 'CHART_ANALYSIS', maxResults: 5 }],
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${errorText}`);
  }

  return response.json();
}

export default analyzeImageWithGemini;

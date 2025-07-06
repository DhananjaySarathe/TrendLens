import fetch from "node-fetch";

export async function analyzeChartImage(imageBuffer) {
  const API_URL = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224";
  const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

  if (!API_TOKEN) {
    throw new Error("HuggingFace API token missing in .env");
  }

  const base64 = imageBuffer.toString("base64");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: base64 }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("HuggingFace API error:", errorText);
    throw new Error("Failed to call HuggingFace API");
  }

  const predictions = await response.json();

  // Check if any label contains "chart" or "candlestick"
  const foundChart = predictions.some((p) =>
    /chart|candlestick|stock/i.test(p.label)
  );

  if (!foundChart) {
    return { patterns: [] };
  }

  // Dummy response - replace with real analysis later
  return {
    patterns: [
      {
        name: "Head and Shoulders",
        description: "Potential reversal pattern",
        position: { x: 100, y: 120 },
      },
      {
        name: "Support Level",
        description: "Identified horizontal support",
        position: { x: 80, y: 200 },
      },
    ],
  };
}

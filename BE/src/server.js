import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});















// import express from "express";
// import multer from "multer";
// import cors from "cors";
// import dotenv from "dotenv";
// import { analyzeChartImage } from "./chartClassifier.js";

// dotenv.config();

// const app = express();
// const upload = multer();

// app.use(cors());

// app.post("/analyze", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No image uploaded" });
//     }
//     const imageBuffer = req.file.buffer;
//     const result = await analyzeChartImage(imageBuffer);
//     res.json(result);
//   } catch (error) {
//     console.error("Error in analysis:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

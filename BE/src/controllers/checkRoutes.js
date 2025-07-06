// routes/checkRoutes.js

import express from 'express';

export function checkRoutes() {
  const router = express.Router();

  // GET /api/check
  router.get('/', (req, res) => {
    res.status(200).json({ message: '✅ Backend is connected!' });
  });

  return router;
}

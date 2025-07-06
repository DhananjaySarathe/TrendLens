import express from 'express';

export function checkRoutes() {
  const router = express.Router();

  // GET /api/txt
  router.get('/txt', (req, res) => {
    res.status(200).json({ message: '✅ Backend is connected!' });
  });

  return router;
}

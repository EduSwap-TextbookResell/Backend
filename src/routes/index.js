import { Router } from 'express';

import logger from '../configs/logger.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.get('/api', (req, res) => {
  res.json({ message: 'ok' });
});

router.use('/api/auth', authRoutes);

router.use('/api/user', userRoutes);

router.all('*', (req, res) =>
  res.status(404).json({ message: `No route for ${req.originalUrl}` }),
);

router.use((err, req, res, _next) => {
  console.error('Error:', err.message);

  logger.error(err);

  res.status(err.statusCode || 500).json({
    error: err.message,
  });
});

export default router;

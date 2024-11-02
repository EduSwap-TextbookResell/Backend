import { Router } from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.get('/api', (req, res) => {
  res.json({ message: 'ok' });
});

router.use('/api/auth', authRoutes);

router.use('/api/user', userRoutes);

router.use('/api', (req, res) =>
  res.status(404).json({ error: 'No route for this path' }),
);

router.use((err, req, res, _) => {
  console.error('Error:', err.message);

  res.status(500).json({
    error: err.message,
  });
});

export default router;

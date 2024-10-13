import { Router } from 'express';

import testRouter from './test.route.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

router.use('/api/test', testRouter);

router.use('/api', (req, res) =>
  res.status(404).json('No route for this path'),
);

export default router;

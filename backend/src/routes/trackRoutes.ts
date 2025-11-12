/**
 * Track Routes - Placeholder
 */

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all tracks - Coming soon' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get track ${req.params.id} - Coming soon` });
});

router.post('/search', (req, res) => {
  res.json({ message: 'Search tracks - Coming soon' });
});

export default router;

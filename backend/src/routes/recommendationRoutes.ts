/**
 * Recommendation Routes - AI-powered recommendations
 */

import { Router } from 'express';

const router = Router();

router.get('/tracks', (req, res) => {
  res.json({ message: 'Get recommended tracks - Coming soon' });
});

router.get('/playlists', (req, res) => {
  res.json({ message: 'Get recommended playlists - Coming soon' });
});

export default router;

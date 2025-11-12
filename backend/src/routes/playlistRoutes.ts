/**
 * Playlist Routes - Placeholder
 */

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all playlists - Coming soon' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create playlist - Coming soon' });
});

export default router;

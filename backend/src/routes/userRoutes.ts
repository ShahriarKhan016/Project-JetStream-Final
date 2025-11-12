/**
 * User Routes - Placeholder
 */

import { Router } from 'express';

const router = Router();

router.get('/profile', (req, res) => {
  res.json({ message: 'Get user profile - Coming soon' });
});

router.put('/profile', (req, res) => {
  res.json({ message: 'Update user profile - Coming soon' });
});

export default router;

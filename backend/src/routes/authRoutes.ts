/**
 * Authentication Routes - Placeholder
 */

import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint - Coming soon' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint - Coming soon' });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout endpoint - Coming soon' });
});

export default router;

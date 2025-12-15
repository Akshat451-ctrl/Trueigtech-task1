import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/store.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Signup
router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body || {};
  if (!email || !username || !password) return res.status(400).json({ error: 'email, username and password required' });
  if (findUserByEmail(email)) return res.status(400).json({ error: 'Email already used' });

  const hash = await bcrypt.hash(password, 10);
  
  const user = createUser({ email, username, passwordHash: hash });
  
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
 
  const safeUser = { id: user.id, username: user.username, email: user.email, createdAt: user.createdAt };
  return res.json({ token, user: safeUser });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const user = findUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  const safeUser = { id: user.id, username: user.username, email: user.email, createdAt: user.createdAt };
  return res.json({ token, user: safeUser });
});

export default router;

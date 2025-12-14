import jwt from 'jsonwebtoken';
import { findUserById } from '../models/store.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

export function authMiddleware(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Bad Authorization format' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = findUserById(payload.userId);
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

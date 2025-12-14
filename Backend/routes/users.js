import express from 'express';
import { findUserById, users, posts } from '../models/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


router.post('/users/:id/follow', authMiddleware, (req, res) => {
  const targetId = Number(req.params.id);
  if (!targetId) return res.status(400).json({ error: 'Invalid user id' });
  if (req.user.id === targetId) return res.status(400).json({ error: 'Cannot follow yourself' });
  const target = findUserById(targetId);
  if (!target) return res.status(404).json({ error: 'Target user not found' });

  for (let i = 0; i < req.user.following.length; i++) {
    if (req.user.following[i] === targetId) return res.json({ message: 'Already following' });
  }

  req.user.following.push(targetId);
  target.followers.push(req.user.id);
  return res.json({ message: 'Followed' });
});


router.post('/users/:id/unfollow', authMiddleware, (req, res) => {
  const targetId = Number(req.params.id);
  if (!targetId) return res.status(400).json({ error: 'Invalid user id' });
  const target = findUserById(targetId);
  if (!target) return res.status(404).json({ error: 'Target user not found' });

  let removed = false;
  for (let i = 0; i < req.user.following.length; i++) {
    if (req.user.following[i] === targetId) { req.user.following.splice(i, 1); removed = true; break; }
  }
  for (let j = 0; j < target.followers.length; j++) {
    if (target.followers[j] === req.user.id) { target.followers.splice(j, 1); break; }
  }
  if (removed) return res.json({ message: 'Unfollowed' });
  return res.json({ message: 'Was not following' });
});


router.get('/users', (req, res) => {
  const out = [];
  for (let i = 0; i < users.length; i++) out.push({ id: users[i].id, username: users[i].username, followers: users[i].followers.length, following: users[i].following.length });
  return res.json({ users: out });
});


router.get('/users/:id', (req, res) => {
  const uid = Number(req.params.id);
  if (!uid) return res.status(400).json({ error: 'Invalid user id' });
  const u = findUserById(uid);
  if (!u) return res.status(404).json({ error: 'User not found' });
  const theirPosts = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].userId === uid) theirPosts.push(posts[i]);
  }
  const outPosts = [];
  for (let i = 0; i < theirPosts.length; i++) {
    const p = theirPosts[i];
    outPosts.push({ id: p.id, image_url: p.image_url, caption: p.caption, likeCount: p.likes.length, comments: p.comments.length, createdAt: p.createdAt });
  }
  return res.json({ id: u.id, username: u.username, followers: u.followers.length, following: u.following.length, posts: outPosts });
});

export default router;

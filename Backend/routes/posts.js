import express from 'express';
import { createPost, findPostById, posts } from '../models/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


router.post('/posts', authMiddleware, (req, res) => {
  const { image_url, caption } = req.body || {};
  if (!image_url) return res.status(400).json({ error: 'image_url required' });
  const post = createPost({ userId: req.user.id, image_url, caption });
  return res.json({ message: 'Post created', post });
});


router.post('/posts/:id/like', authMiddleware, (req, res) => {
  const pid = Number(req.params.id);
  const post = findPostById(pid);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  for (let i = 0; i < post.likes.length; i++) {
    if (post.likes[i] === req.user.id) return res.json({ message: 'Already liked', likeCount: post.likes.length });
  }
  post.likes.push(req.user.id);
  return res.json({ message: 'Liked', likeCount: post.likes.length });
});


router.post('/posts/:id/unlike', authMiddleware, (req, res) => {
  const pid = Number(req.params.id);
  const post = findPostById(pid);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  for (let i = 0; i < post.likes.length; i++) {
    if (post.likes[i] === req.user.id) { post.likes.splice(i, 1); return res.json({ message: 'Unliked', likeCount: post.likes.length }); }
  }
  return res.json({ message: 'Was not liked', likeCount: post.likes.length });
});


router.post('/posts/:id/comments', authMiddleware, (req, res) => {
  const pid = Number(req.params.id);
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text required' });
  const post = findPostById(pid);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const comment = { id: Date.now(), userId: req.user.id, text, createdAt: Date.now() };
  post.comments.push(comment);
  return res.json({ message: 'Comment added', comment });
});


router.get('/feed', authMiddleware, (req, res) => {
  const feedPosts = [];
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    if (p.userId === req.user.id) { feedPosts.push(p); continue; }
    for (let j = 0; j < req.user.following.length; j++) {
      if (p.userId === req.user.following[j]) { feedPosts.push(p); break; }
    }
  }
  feedPosts.sort((a, b) => b.createdAt - a.createdAt);
  const out = [];
  for (let i = 0; i < feedPosts.length; i++) {
    const p = feedPosts[i];
    out.push({ id: p.id, userId: p.userId, image_url: p.image_url, caption: p.caption, likeCount: p.likes.length, comments: p.comments });
  }
  return res.json({ posts: out });
});


router.get('/posts/:id', (req, res) => {
  const pid = Number(req.params.id);
  const post = findPostById(pid);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  return res.json({ id: post.id, userId: post.userId, image_url: post.image_url, caption: post.caption, likes: post.likes, likeCount: post.likes.length, comments: post.comments, createdAt: post.createdAt });
});

export default router;

import React, { useState } from 'react';
import { apiRequest } from '../api';

export default function PostCard({ post, token, onOpen, onProfile }) {
  
  const [likes, setLikes] = useState(post.likeCount || 0);
  const [comments, setComments] = useState(post.comments || []);

  function formatTime(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleString();
  }

  async function doLike() {
    const res = await apiRequest('/posts/' + post.id + '/like', 'POST', null, token);
    if (res && typeof res.likeCount === 'number') {
      setLikes(res.likeCount);
    } else {
      if (res && res.error) alert('Like error: ' + res.error);
      else alert('Could not like');
    }
  }

  async function doUnlike() {
    const res = await apiRequest('/posts/' + post.id + '/unlike', 'POST', null, token);
    if (res && typeof res.likeCount === 'number') {
      setLikes(res.likeCount);
    } else {
      if (res && res.error) alert('Unlike error: ' + res.error);
      else alert('Could not unlike');
    }
  }

  async function addComment(text) {
    if (!text) return;
    const res = await apiRequest('/posts/' + post.id + '/comments', 'POST', { text }, token);
    if (res && res.comment) {
      const newComments = [];
      for (let i = 0; i < comments.length; i++) newComments.push(comments[i]);
      newComments.push({ id: res.comment.id, user: { username: 'you' }, text: res.comment.text });
      setComments(newComments);
    } else {
      if (res && res.error) alert('Comment error: ' + res.error);
      else alert('Could not add comment');
    }
  }

  
  const commentElems = [];
  for (let i = 0; i < comments.length && i < 2; i++) {
    const c = comments[i];
    commentElems.push(
      <div key={c.id} className="text-sm py-1">
        <strong className="mr-2">{(c.user && c.user.username) || 'user'}</strong>
        <span>{c.text}</span>
      </div>
    );
  }

 
  function initials(name) {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0].slice(0, 1) + parts[1].slice(0, 1)).toUpperCase();
  }

  return (
    <article className="bg-white/6 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold" onClick={() => onProfile && onProfile(post.user.id)}>
            {initials(post.user.username)}
          </div>
          <div>
            <div className="font-medium cursor-pointer" onClick={() => onProfile && onProfile(post.user.id)}>{post.user.username}</div>
            <div className="text-xs text-gray-400">{formatTime(post.createdAt)}</div>
          </div>
        </div>
        <button className="text-sm text-indigo-400" onClick={() => onOpen && onOpen(post.id)}>Open</button>
      </div>

      <div className="mb-3">
        <div className="w-full overflow-hidden rounded bg-black">
          <img src={post.image_url} alt="post" className="w-full object-cover" />
        </div>
        <p className="mt-2 text-gray-100">{post.caption}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
        <div>Likes: <span className="font-medium text-white">{likes}</span></div>
        <div>Comments: <span className="font-medium text-white">{comments.length}</span></div>
      </div>

      <div className="flex items-center space-x-2 mb-3">
        <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm" onClick={doLike}>Like</button>
        <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm" onClick={doUnlike}>Unlike</button>
        <button className="ml-auto text-xs text-gray-400" onClick={() => alert('Saved locally (demo)')}>Save</button>
      </div>

      <div className="mb-3">{commentElems}</div>

      <CommentForm onAdd={addComment} />
    </article>
  );
}

function CommentForm({ onAdd }) {
  const [text, setText] = useState('');

  function submit(e) {
    e.preventDefault();
    if (text && text.trim() !== '') {
      onAdd(text.trim());
      setText('');
    }
  }

  return (
    <form onSubmit={submit} className="flex space-x-2">
      <input className="flex-1 border rounded px-2 py-1 bg-transparent text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="Write a comment" />
      <button className="px-3 py-1 bg-green-600 text-white rounded text-sm" type="submit">Send</button>
    </form>
  );
}

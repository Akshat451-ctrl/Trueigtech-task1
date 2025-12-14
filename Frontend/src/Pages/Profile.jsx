import { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Profile({ token, userId }) {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      let id = userId;
      if (!id) {
        const me = await apiRequest('/me', 'GET', null, token);
        if (me && me.id) id = me.id;
        else {
          setProfile({ error: 'Could not load user' });
          return;
        }
      }
      const data = await apiRequest('/users/' + id, 'GET', null, token);
      if (data && data.id) {
        setProfile({ id: data.id, username: data.username, followers: data.followers, following: data.following });
        setPosts(data.posts || []);
      } else {
        setProfile({ error: (data && data.error) || 'Could not load profile' });
      }
    }
    load();
  }, []);

  if (!profile) return <div className="p-4">Loading profile...</div>;
  if (profile.error) return <div className="p-4">Error: {profile.error}</div>;

  const postElems = [];
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    postElems.push(
      <div key={p.id} className="border rounded p-2 m-2">
        <img src={p.image_url} alt="post" className="w-full max-w-sm" />
        <p className="text-sm">{p.caption}</p>
        <p className="text-xs text-gray-500">Likes: {p.likeCount} • Comments: {p.comments}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{profile.username}</h2>
        <p className="text-sm">Followers: {profile.followers} • Following: {profile.following}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{postElems}</div>
    </div>
  );
}

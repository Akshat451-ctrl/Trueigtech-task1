import { useEffect, useState } from "react";
import {
  ImagePlus,
  Send,
  Heart,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import { insertpost, getFeed } from "../APIS/Api/FeedApi";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000/";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [preview, setPreview] = useState([]);
  const [likes, setLikes] = useState({});
  const [following, setFollowing] = useState({}); 

  const userId = Cookies.get("userId");
  const dispatch = useDispatch();

  const feedData = useSelector((state) => state.feedSlice.feedData);

  useEffect(() => {
    (async () => {
      await dispatch(getFeed());
    })();
  }, [dispatch]);

  
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));
    setPreview(previews);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && media.length === 0) return;

    const formData = new FormData();
    formData.append("text", text);
    formData.append("userId", userId);
    media.forEach((file) => formData.append("media", file));

    const res = await dispatch(insertpost(formData));

    if (res?.payload?.status) {
      setText("");
      setMedia([]);
      setPreview([]);
      dispatch(getFeed());
    }
  };

  
  const handleLikeToggle = (feedId) => {
    setLikes((prev) => {
      const current = prev[feedId] || { liked: false, count: 0 };

      return {
        ...prev,
        [feedId]: {
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1,
        },
      };
    });
  };

  
  const handleFollowToggle = (post) => {
    setFollowing((prev) => {
      if (prev[post.user_id]) {
        const updated = { ...prev };
        delete updated[post.user_id];
        return updated;
      }

      return {
        ...prev,
        [post.user_id]: {
          user_id: post.user_id,
          username: post.username,
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 items-start">

        
        <div className="col-span-12 md:col-span-8 space-y-6">

         
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-3">Create Post</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-24 resize-none rounded-xl bg-gray-900 p-3 outline-none"
              />

              {preview.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {preview.map((item, index) => (
                    <div key={index} className="rounded-xl overflow-hidden">
                      {item.type === "image" ? (
                        <img src={item.url} className="h-24 w-full object-cover" />
                      ) : (
                        <video src={item.url} className="h-24 w-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-pink-400 cursor-pointer">
                  <ImagePlus size={20} />
                  <span>Photo / Video</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    hidden
                    onChange={handleMediaChange}
                  />
                </label>

                <button className="bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 rounded-full flex items-center gap-2">
                  <Send size={18} /> Post
                </button>
              </div>
            </form>
          </div>

          
          {feedData?.map((post) => {
            const mediaUrl =
              BASE_URL + post.post_url?.replace(/\\/g, "/");

            const isVideo = post.file_name?.match(/\.(mp4|webm|ogg)$/i);

            return (
              <div
                key={post.feed_id}
                className="bg-gray-950 border border-gray-800 rounded-3xl p-5 space-y-4"
              >
                
                <div className="flex justify-between items-center">
                  <div className="font-semibold">@{post.username}</div>

                  <button
                    onClick={() => handleFollowToggle(post)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition ${
                      following[post.user_id]
                        ? "bg-gray-700"
                        : "bg-blue-600"
                    }`}
                  >
                    <UserPlus size={14} />
                    {following[post.user_id] ? "Following" : "Follow"}
                  </button>
                </div>

           
                {post.post_url && (
                  isVideo ? (
                    <video
                      src={mediaUrl}
                      controls
                      className="w-full max-h-[400px] object-cover"
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt="feed"
                      className="w-full max-h-[400px] object-cover"
                    />
                  )
                )}

               
                <p className="text-sm text-gray-300">{post.text}</p>

                
                <div className="flex gap-6 text-gray-400">
                  <button
                    onClick={() => handleLikeToggle(post.feed_id)}
                    className={`flex items-center gap-1 ${
                      likes[post.feed_id]?.liked
                        ? "text-pink-500"
                        : "hover:text-pink-500"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={
                        likes[post.feed_id]?.liked
                          ? "currentColor"
                          : "none"
                      }
                    />
                    {likes[post.feed_id]?.count || 0}
                  </button>

                  <button className="flex items-center gap-1 hover:text-blue-400">
                    <MessageCircle size={18} /> 0
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden md:block col-span-4">
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Following</h3>

            {Object.keys(following).length === 0 ? (
              <p className="text-sm text-gray-400">
                Follow users to see them here.
              </p>
            ) : (
              <div className="space-y-4">
                {Object.values(following).map((user) => (
                  <div
                    key={user.user_id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          @{user.username}
                        </p>
                        <p className="text-xs text-gray-400">
                          Following
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleFollowToggle({
                          user_id: user.user_id,
                          username: user.username,
                        })
                      }
                      className="text-xs bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-700"
                    >
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

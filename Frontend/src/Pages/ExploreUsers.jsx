import { useEffect, useState } from "react";
import { UserPlus, UserCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { exploreUsers, followUser, getFeed } from "../APIS/Api/FeedApi";
import Cookies from "js-cookie";
import { current } from "@reduxjs/toolkit";
import Nav from "../Components/Nav";

export default function ExploreUsers() {
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");

  const exploreUsersData = useSelector((state) => state.feedSlice.exploreUsers);

  const [following, setFollowing] = useState({});

  
  useEffect(() => {
    console.log("Fetching explore users for:", userId);
    dispatch(exploreUsers({currentUserId: userId}));
  }, [dispatch]);

  /* Extract unique users from feed */
  // const usersMap = {};
  // feedData?.forEach((post) => {
  //   if (post.user_id !== Number(loggedInUserId)) {
  //     usersMap[post.user_id] = {
  //       user_id: post.user_id,
  //       username: post.username,
  //     };
  //   }
  // });

  // const users = Object.values(usersMap);

  /* Follow / Unfollow (Local) */
  const handleFollowToggle = async (user) => {
    // setFollowing((prev) => {
    //   if (prev[user.user_id]) {
    //     const updated = { ...prev };
    //     delete updated[user.user_id];
    //     return updated;
    //   }

    //   return {
    //     ...prev,
    //     [user.user_id]: user,
    //   };
    // });
    await dispatch(followUser({ followedUserId:userId , currentUserId: user.id }));
    dispatch(exploreUsers({currentUserId: userId}));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Nav />
      <div className="max-w-5xl mx-auto">

        <h2 className="text-2xl font-semibold mb-6">
          Explore People
        </h2>

        {exploreUsersData?.length === 0 ? (
          <p className="text-gray-400">
            No users to explore yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {exploreUsersData?.map((user) => (
              <div
                key={user.id}
                className="bg-gray-950 border border-gray-800 rounded-2xl p-5 flex flex-col items-center text-center"
              >
                {/* Avatar */}
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl font-bold mb-3">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                {/* Username */}
                <p className="font-medium mb-4">
                  @{user.username}
                </p>

                {/* Follow Button */}
                <button
                  onClick={() => handleFollowToggle(user)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                    following[user.user_id]
                      ? "bg-gray-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {following[user.user_id] ? (
                    <>
                      <UserCheck size={16} /> Following
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} /> Follow
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

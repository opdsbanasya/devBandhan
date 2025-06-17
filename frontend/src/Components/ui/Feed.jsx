import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { addFeedData } from "@/store/userFeedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [userIndex, setUserIndex] = useState(0);

  console.log(feed);
  
  const getUserFeed = async () => {
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeedData(feedData?.data?.usersForFeed));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  return (
    <div
      data-theme="black"
      className="w-screen h-[90vh] bg-gradient-to-br from-zinc-900 to-zinc-800 flex"
    >
      <div className="w-1/4 h-full bg-base-200 border-r border-zinc-700 p-4 text-white">
        <h3 className="text-lg font-semibold mb-4">Chats</h3>
        {/* Chat list placeholder */}
      </div>
      <div className="w-3/4 h-full bg-transparent flex items-center justify-center relative flex-wrap gap-5">
        {/* {feed && feed.map(user => <FeedCard user={user} key={user?._id}/>)} */}
        {(feed && feed.length > userIndex ?(
          <FeedCard
            user={feed[userIndex]}
            handleUser={setUserIndex}
            index={userIndex}
            key={user?._id}
          />): (
            <h3>No user</h3>
          )
        )}
      </div>
    </div>
  );
};

export default Feed;

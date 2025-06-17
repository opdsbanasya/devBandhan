import React from "react";
import { AuroraText } from "../magicui/aurora-text";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { removeUserFromFeed } from "@/store/userFeedSlice";

const FeedCard = ({ user, handleUser, index }) => {
  const dispatch = useDispatch();

  const handleInterested = async (toUserId, status) => {
    try {
      const request = await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        "",
        { withCredentials: true }
      );

      console.log(request);
      dispatch(removeUserFromFeed(toUserId));
      console.log("request sent!!" + user?.firstName);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card w-96 rounded-xl shadow-xl bg-base-100/10 border border-zinc-700 backdrop-blur-md">
      <figure className="h-96 overflow-hidden">
        <img
          src={user?.profilePhoto}
          alt={user?.firstName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title text-2xl font-bold text-transparent bg-gradient-to-r from-[#E0FFFF] via-[#FFDAB9] to-[#FADADD] bg-clip-text">
          <AuroraText>{user?.firstName + " " + user?.lastName} </AuroraText>
          <span className="text-white text-sm">{user?.age}</span>
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {user?.skills.map((skill, idx) => (
            <code
              key={idx}
              className="px-3 py-1 rounded-md bg-[#FFFACD]/20 text-[#FFFACD] text-sm font-medium tracking-wide"
            >
              {skill}
            </code>
          ))}
        </div>

        <p className="mt-4 text-sm text-zinc-300">
          {user?.about.length >= 80
            ? `${user.about.slice(0, 82)}...`
            : user?.about}
        </p>

        <div className="card-actions justify-between mt-6">
          <button className="btn btn-md px-5 py-1 font-semibold rounded-full cursor-pointer border border-zinc-100 bg-transparent hover:bg-red-100 hover:text-red-500 transition-all duration-500"
          onClick={() => handleInterested(user._id, "ignored")}>
            Ignore ❌
          </button>
          <button
            className="btn btn-md px-5 py-1 font-semibold rounded-full cursor-pointer border border-zinc-100 bg-transparent hover:bg-pink-100 hover:text-pink-500 transition-all duration-500"
            onClick={() => handleInterested(user._id, "interested")}
          >
            Interested ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

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

      dispatch(removeUserFromFeed(toUserId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card w-full md:w-3/4 xl:w-96 md:h-[70vh] xl:h-full rounded-xl shadow-xl bg-base-100/10 border border-zinc-700 backdrop-blur-md">
      <figure className="h-80 md:h-2/3 xl:h-96 overflow-hidden">
        <img
          src={user?.profilePhoto}
          alt={user?.firstName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title text-xl md:text-3xl lg:text-4xl xl:text-2xl font-bold text-transparent bg-gradient-to-r from-[#E0FFFF] via-[#FFDAB9] to-[#FADADD] bg-clip-text">
          <AuroraText>{user?.firstName + " " + user?.lastName} </AuroraText>
          <span className="text-white text-xs md:text-base lg:text-lg xl:text-sm">
            {user?.age}
          </span>
        </h2>

        <div className="flex flex-wrap gap-2 md:gap-5 xl:gap-2 mt-2">
          {user?.skills.map((skill, idx) => {
            if (idx < 3) {
              return <code
                key={idx}
                className={"px-2 py-0.5 md:px-4 md:py-2 text-xs md:text-xl lg:text-2xl xl:text-sm rounded-sm md:rounded-md bg-[#FFFACD]/20 text-[#FFFACD]  font-medium tracking-wide"}
              >
                {skill}
              </code>;
            }
          })}
        </div>

        <p className="md:mt-4 text-sm md:text-lg lg:text-xl xl:text-sm text-zinc-300 hidden md:block">
          {user?.about.length >= 100
            ? `${user.about.slice(0, 100)}...`
            : user?.about}
        </p>

        <div className="card-actions justify-between mt-2 md:mt-4">
          <button
            className="btn btn-md px-5 py-1 md:py-6 lg:px-10 lg:py-8 xl:px-5 xl:py-2 md:text-lg lg:text-xl xl:text-base font-semibold rounded-full cursor-pointer border border-zinc-100 bg-transparent hover:bg-red-100 hover:text-red-500 transition-all duration-500"
            onClick={() => handleInterested(user._id, "ignored")}
          >
            Ignore ❌
          </button>
          <button
            className="btn btn-md px-5 py-1 md:py-6 lg:px-10 lg:py-8 xl:px-5 xl:py-2 md:text-lg lg:text-xl xl:text-base font-semibold rounded-full cursor-pointer border border-zinc-100 bg-transparent hover:bg-pink-100 hover:text-pink-500 transition-all duration-500"
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

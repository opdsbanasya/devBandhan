import { removeRequest } from "@/store/connectionRequestSlice";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

const Request = ({ request, idx }) => {
  const dispatch = useDispatch();

  const { firstName, lastName, profilePhoto } = request.fromUserId;

  const reviewRequest = async (requestId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        "",
        { withCredentials: true }
      );

      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={`flex items-center gap-5 px-3 py-3 md:py-5 md:px-6 xl:px-3 xl:py-5 border-b border-zinc-800 ${idx === 0 && "border-t"}`}>
      <figure className="w-2/12 cursor-pointer">
        <img
          src={profilePhoto}
          alt={firstName}
          className="w-full object-cover aspect-square rounded-full border border-zinc-400"
        />
      </figure>
      <div className="w-6/12 md:w-8/12 text-sm md:text-lg lg:text-xl xl:text-base">
        <h2>{`${firstName} ${lastName}`}</h2>
      </div>
      <div className="space-x-3 md:space-x-4 xl:space-x-2 w-20 text-sm md:text-lg lg:text-xl xl:text-base">
        <button
          className="cursor-pointer"
          onClick={() => reviewRequest(request?._id, "accepted")}
        >
          ✔️
        </button>
        <button
          className="cursor-pointer"
          onClick={() => reviewRequest(request?._id, "rejected")}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default Request;

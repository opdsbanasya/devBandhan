import { removeRequest } from "@/store/connectionRequestSlice";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

const Request = ({ request }) => {
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
    <div className="flex items-center gap-5 py-3 px-5 border-b border-b-zinc-800">
      <figure className="w-2/12 cursor-pointer">
        <img
          src={profilePhoto}
          alt={firstName}
          className="w-full object-cover aspect-square rounded-full"
        />
      </figure>
      <div className="w-6/12">
        <h2>{`${firstName} ${lastName}`}</h2>
      </div>
      <div className="space-x-4">
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

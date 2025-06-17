import { addRequests } from "@/store/connectionRequestSlice";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Request from "./Request";

const Requests = () => {
  const { requests } = useSelector((store) => store.connectionRequest);
  const dispatch = useDispatch();

  const getRequests = async () => {
    const userRequests = await axios.get(`${BASE_URL}/user/requests/recieved`, {
      withCredentials: true,
    });

    dispatch(addRequests(userRequests?.data?.pendingRequests));
  };

  console.log(requests && requests[0]);

  useEffect(() => {
    if (!requests) {
      getRequests();
    }
  }, []);

  return (
    <div className="w-full ">
      {requests &&
        requests.map((request) => (
          <Request request={request} key={request._id} />
        ))}
    </div>
  );
};

export default Requests;

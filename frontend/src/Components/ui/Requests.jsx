import React from "react";
import { useSelector } from "react-redux";
import Request from "./Request";

const Requests = () => {
  const { requests } = useSelector((store) => store.connectionRequest);

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

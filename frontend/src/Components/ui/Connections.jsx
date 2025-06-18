import { addConnections } from "@/store/connectionRequestSlice";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const { connections } = useSelector((store) => store.connectionRequest);
  const dispatch = useDispatch();

  const getConnections = async () => {
    const userConnections = await axios.get(`${BASE_URL}/user/connections`, {
      withCredentials: true,
    });

    dispatch(addConnections(userConnections?.data?.data));
  };

  useEffect(() => {
    if (!connections) {
      getConnections();
    }
  }, []);

  return (
    <div className="w-full ">
      {connections && connections.length === 0 && <div>No connections</div>}
      {connections &&
        (connections.map((connection) => (
          <div key={connection._id} className="flex items-center gap-5 py-3 px-5 border-b border-b-zinc-800">
            <figure className="w-2/12 cursor-pointer">
              <img
                src={connection?.profilePhoto}
                alt={connection?.firstName}
                className="w-full object-cover aspect-square rounded-full"
              />
            </figure>
            <div className="w-8/12">
              <h2>{`${connection?.firstName} ${connection?.lastName}`}</h2>
            </div>
            <div className=" space-x-5">
              <button className="cursor-pointer">
                <ArrowUpRight />
              </button>
              {/* <button>❌</button> */}
            </div>
          </div>
        )))}
    </div>
  );
};

export default Connections;

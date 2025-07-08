import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Connections = () => {
  const { connections } = useSelector((store) => store.connectionRequest);

  return (
    <div className="w-full md:w-3/4 xl:w-full mx-auto px-2 md:px-5">
      {connections && connections.length === 0 && <div>No connections</div>}
      {connections &&
        connections.map((connection, idx) => (
          <div
            key={connection._id}
            className={`flex items-center gap-5 px-5 py-3 md:py-5 md:px-6 xl:px-4 xl:py-3 border-b border-zinc-800 ${idx === 0 && "border-t"}`}
          >
            <figure className="w-2/12 cursor-pointer">
              <img
                src={connection?.profilePhoto}
                alt={connection?.firstName}
                className="w-full object-cover aspect-square rounded-full border border-zinc-400"
              />
            </figure>
            <div className="w-8/12 lg:w-9/12 xl:w-8/12 md:text-lg lg:text-xl xl:text-base">
              <h2>{`${connection?.firstName} ${connection?.lastName}`}</h2>
            </div>
            <div className=" space-x-5">
              <button className="cursor-pointer">
                <ArrowUpRight />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Connections;

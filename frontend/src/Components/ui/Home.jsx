import React, { useState } from "react";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";

const Home = () => {

  const [isChat, setIsChat] = useState(true);

  return (
    <div
      data-theme="black"
      className="w-screen h-[90vh] bg-gradient-to-br from-zinc-900 to-zinc-800 flex"
    >
      <div className="w-1/4 h-full bg-base-200 border-r border-zinc-700 text-white">
        <div className="flex w-full px-5 gap-4">
          <button
            onClick={() => setIsChat(true)}
            className={`w-1/2 py-2 text-sm font-semibold transition-colors rounded-b-lg ${
              isChat
                ? "bg-blue-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            Chats
          </button>
          <button
            onClick={() => setIsChat(false)}
            className={`w-1/2 py-2 text-sm font-semibold transition-colors rounded-b-lg ${
              !isChat
                ? "bg-blue-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            Connections
          </button>
        </div>
      </div>
      <div className="w-3/4 h-full bg-transparent flex items-center justify-center relative flex-wrap gap-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

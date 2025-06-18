import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Connections from "./Connections";
import { MessageCircle, UserPlus, Users } from "lucide-react";
import Requests from "./Requests";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, addRequests } from "@/store/connectionRequestSlice";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";

const Home = () => {
  const [tabName, setTabName] = useState("chat");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(()=>{
    if(!user){
      navigate("/get-started")
    }
  })


  const getConnections = async () => {
    const userConnections = await axios.get(`${BASE_URL}/user/connections`, {
      withCredentials: true,
    });

    dispatch(addConnections(userConnections?.data?.data));
  };

  const getRequests = async () => {
    const userRequests = await axios.get(`${BASE_URL}/user/requests/recieved`, {
      withCredentials: true,
    });

    dispatch(addRequests(userRequests?.data?.pendingRequests));
  };

  const handleTabs = (tab) => {
    setTabName(tab);
    if (tab === "connection") {
      getConnections();
    }
    if (tab === "request") {
      getRequests();
    }
    navigate("/?tab=" + tab);
  };

  return (
    <div
      data-theme="black"
      className="w-screen h-[90vh] bg-gradient-to-br from-zinc-900 to-zinc-800 flex"
    >
      <div className="w-1/4 h-full bg-base-200 border-r border-zinc-700 text-white">
        <div className="flex w-full px-5 gap-4 border-b border-zinc-500 py-5 justify-center">
          <button
            onClick={() => handleTabs("chat")}
            className={`px-5 py-2 text-sm font-semibold transition-colors rounded-lg ${
              tabName === "chat"
                ? "bg-blue-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            <MessageCircle />
          </button>
          <button
            onClick={() => handleTabs("connection")}
            className={` px-5 py-2 text-sm font-semibold transition-colors rounded-lg ${
              tabName === "connection"
                ? "bg-blue-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            <Users />
          </button>
          <button
            onClick={() => handleTabs("request")}
            className={` px-5 py-2 text-sm font-semibold transition-colors rounded-lg ${
              tabName === "request"
                ? "bg-blue-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            <UserPlus />
          </button>
        </div>
        <div>
          {tabName === "chat" && "Chats"}
          {tabName === "connection" && <Connections />}
          {tabName === "request" && <Requests />}
        </div>
      </div>
      <div className="w-3/4 h-full bg-transparent flex items-center justify-center relative flex-wrap gap-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

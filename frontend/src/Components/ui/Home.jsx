import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Connections from "./Connections";
import { House, MessageCircle, UserPlus, Users } from "lucide-react";
import Requests from "./Requests";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, addRequests } from "@/store/connectionRequestSlice";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { Dock, DockIcon } from "@/components/magicui/dock";

const Home = () => {
  const [tabName, setTabName] = useState("chat");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/get-started");
    }
  });

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
    if (tab === "") {
      return navigate("/");
    }
    navigate("/?tab=" + tab);
  };

  return (
    <div data-theme="black" className="w-screen min-h-[90vh] bg-base-200 xl:flex">
      <div className="w-11/12 xl:w-1/4 min-h-full bg-base-200 xl:border-r border-zinc-700 text-white mx-auto">
        <div className="relative flex w-full px-5 gap-4 xl:border-b border-zinc-500 py-5 justify-center">
          <Dock direction="middle" >
            <div className="block xl:hidden">
            <DockIcon
              onClick={() => handleTabs("")}
              className={`${tabName === "" ? "text-blue-500" : "text-white"}`}
            >
              <House size={24} />
            </DockIcon>
            </div>
            <DockIcon
              onClick={() => handleTabs("chat")}
              className={`${
                tabName === "chat" ? "text-blue-500" : "text-white"
              }`}
            >
              <MessageCircle size={24} />
            </DockIcon>
            <DockIcon
              onClick={() => handleTabs("connection")}
              className={`${
                tabName === "connection" ? "text-blue-500" : "text-white"
              }`}
            >
              <UserPlus size={24}/>
            </DockIcon>
            <DockIcon
              onClick={() => handleTabs("request")}
              className={`${
                tabName === "request" ? "text-blue-500" : "text-white"
              }`}
            >
              <Users size={24}/>
            </DockIcon>
          </Dock>
        </div>
        <div className={`${tabName === "" ? "hidden" : "block"}`}>
          {tabName === "chat" && "Coming Soon..."}
          {tabName === "connection" && <Connections />}
          {tabName === "request" && <Requests />}
        </div>
      </div>
      <div
        className={`w-11/12 xl:w-3/4 h-full bg-transparent flex items-center justify-center relative flex-wrap gap-5 ${
          tabName === "" ? "block" : "hidden"
        } xl:block mx-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

import { createSocketConnetion } from "@/utils/socketClient";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [chatMessage, setChatMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const toUser = location.state?.connection;

  useEffect(() => {
    const socket = createSocketConnetion();
    if (!socket) return;
    socket.on("connect", () => {
      console.log(socket);
      console.log("Socket connected");

      socket.emit("joinChat", {
        userId: user?._id,
        toUserId,
        firstName: user?.firstName,
      });

      socket.on("messageRecieved", ({ firstName, newMessage }) => {
        console.log(firstName + " sent: " + newMessage);
        setChatMessage((messages) => [
          ...messages,
          { firstName, text: newMessage },
        ]);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id, toUserId]);

  const handleSendMessage = () => {
    const socket = createSocketConnetion();
    if (!socket) return;

    socket.emit("sendMessage", {
      userId: user?._id,
      toUserId,
      firstName: user?.firstName,
      newMessage,
    });
    setNewMessage("")
  };
  return (
    <div className="w-11/12 xl:w-full h-full bg-transparent relative flex-wrap py-2 px-10">
      <div className="w-full flex items-center gap-5 py-5 border-b border-zinc-500">
        <div className="size-14 bg-amber-400 rounded-full text-black font-semibold overflow-hidden">
          <img src={toUser?.profilePhoto} className="h-full  object-cover" alt="" />
        </div>
        <div>{toUser?.firstName} {toUser?.lastName}</div>
        {/* <div>Other</div> */}
      </div>
      <div className="px-2 w-full h-[67vh] py-5">
        {chatMessage &&
          chatMessage.map((message, index) => (
            <div key={index} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={IMG_LINK}
                  />
                </div>
              </div>
              <div className="chat-header">
                {message?.firstName}
                {/* <time className="text-xs opacity-50">12:45</time> */}
              </div>
              <div className="chat-bubble">{message?.text}</div>
              {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>
          ))}
      </div>
      <div className="w-full h-14 rounded-md flex items-center justify-between">
        <input
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          value={newMessage}
          className="w-9/10 h-full outline-0 px-5 border-2 border-zinc-100 rounded-md"
          placeholder="Enter a message"
        />
        <button
          onClick={() => handleSendMessage()}
          type="button"
          className="px-4 py-2 bg-blue-500 rounded-md cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

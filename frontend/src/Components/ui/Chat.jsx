import { BASE_URL } from "@/utils/constants";
import { createSocketConnetion } from "@/utils/socketClient";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [chatMessage, setChatMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef();
  const location = useLocation();
  const toUser = location.state?.connection;

  const fetchChats = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${toUserId}`, {
        withCredentials: true,
      });

      const messages = chat?.data?.messages.map((msg) => {
        const { senderId, text, _id } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          profilePhoto: senderId?.profilePhoto,
          text,
          _id,
        };
      });
      setChatMessage(messages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const socket = createSocketConnetion();
    if (!socket) return;
    socket.on("connect", () => {
      socket.emit("joinChat", {
        userId: user?._id,
        toUserId,
        firstName: user?.firstName,
        profilePhoto: user?.profilePhoto,
      });

      socket.on("messageRecieved", ({ firstName, text, profilePhoto }) => {
        console.log({ firstName, text, profilePhoto });

        console.log(firstName + " sent: " + text);
        setChatMessage((messages) => [
          ...messages,
          { firstName, text, profilePhoto },
        ]);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id, toUserId]);

  useEffect(()=> {    
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessage])

  const handleSendMessage = () => {
    const socket = createSocketConnetion();
    if (!socket) return;

    socket.emit("sendMessage", {
      userId: user?._id,
      toUserId,
      firstName: user?.firstName,
      text: newMessage,
      profilePhoto: user?.profilePhoto,
    });
    setNewMessage("");
  };
  return (
    <div className="w-11/12 xl:w-full h-full bg-transparent relative flex-wrap py-2 px-10">
      <div className="w-full flex items-center gap-5 py-5 border-b border-zinc-500">
        <div className="size-14 bg-amber-400 rounded-full text-black font-semibold overflow-hidden">
          <img
            src={toUser?.profilePhoto}
            className="h-full  object-cover"
            alt=""
          />
        </div>
        <div>
          {toUser?.firstName} {toUser?.lastName}
        </div>
        {/* <div>Other</div> */}
      </div>
      <div className={`px-2 w-full h-[67vh] py-5 overflow-y-scroll scroll-smooth`} ref={chatRef}>
        {chatMessage &&
          chatMessage.map((msg, index) => (
            <div
              key={msg?._id || index}
              className={`chat ${
                user?.firstName === msg?.firstName ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={msg?.profilePhoto}
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg?.firstName}
                {/* <time className="text-xs opacity-50">12:45</time> */}
              </div>
              <div className="chat-bubble">{msg?.text}</div>
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

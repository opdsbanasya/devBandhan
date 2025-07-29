import { BASE_URL } from "@/utils/constants";
import { createSocketConnetion } from "@/utils/socketClient";
import axios from "axios";
import { Phone, Undo2, Video } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [chatMessage, setChatMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [internetStatus, setinternetStatus] = useState();
  const chatRef = useRef();
  const location = useLocation();
  const toUser = location.state?.connection;
  const navigate = useNavigate();

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
        setChatMessage((messages) => [
          ...messages,
          { firstName, text, profilePhoto },
        ]);
      });

      socket.on("userNotFound", ({ error }) => {
        alert(error?.message);
        navigate("/");
      });

      socket.on("unAuthorizedConnection", ({ error }) => {
        alert(error?.message);
        navigate("/");
      });

      const timer = setInterval(() => {
        socket.emit("ping", {
          userId: user?._id,
          toUserId,
          firstName: user?.firstName,
          status: navigator.onLine,
        });
      }, 5000);

      socket.on("online", ({ userId, message, status }) => {
        if (toUserId === userId) {
          setinternetStatus(status);
        }
      });

      socket.on("userLeft", ({ userId, message, status }) => {
        if (toUserId === userId) {
          setinternetStatus(status);
        }
      });

      return () => {
        clearInterval(timer);
      };
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id, toUserId]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessage]);

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
    <div className="w-11/12 xl:w-full h-full bg-transparent relative flex-wrap xl:py-2 xl:px-10">
      <div className="w-full flex items-center gap-5 py-3 xl:py-5 border-b border-zinc-500">
        <div className="size-10 xl:size-14 rounded-full overflow-hidden">
          <img
            src={toUser?.profilePhoto}
            className="h-full object-cover"
            alt={toUser?.firstName}
          />
        </div>
        <div>
          {toUser?.firstName} {toUser?.lastName}
          <span className="text-xs">{internetStatus ? " 🟢" : " 🔴"}</span>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <div className="tooltip" data-tip="Comming Soon..">
            <Phone size={20} />
          </div>
          <div className="tooltip" data-tip="Comming Soon..">
            <Video size={20} />
          </div>

          <Undo2 size={20} onClick={() => navigate("/?tab=connection")} />
        </div>
      </div>
      <div
        className={`px-2 w-full h-[67vh] py-5 overflow-y-scroll scroll-smooth`}
        ref={chatRef}
      >
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
                  <img alt={msg?.firstName} src={msg?.profilePhoto} />
                </div>
              </div>
              <div className="chat-header">
                {msg?.firstName}
                {/* <time className="text-xs opacity-50">12:45</time> */}
              </div>
              <div className="chat-bubble text-sm">{msg?.text}</div>
              {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>
          ))}
      </div>
      <div className="w-full h-14 rounded-md flex items-center justify-between">
        <input
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          value={newMessage}
          className="w-9/10 py-2 outline-0 px-4 xl:px-5 border-2 border-zinc-100 rounded-md"
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

import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
    const {toUserId} = useParams();
    console.log(toUserId);
    
  return (
    <div className="w-11/12 xl:w-full h-full bg-transparent relative flex-wrap py-2 px-10">
      <div className="w-full flex items-center gap-5 py-5 border-b border-zinc-500">
        <div className="size-14 bg-amber-400 rounded-full p-4 text-black font-semibold">
          RP
        </div>
        <div>Rishabh Pant</div>
        <div>Other</div>
      </div>
      <div className="px-2 w-full h-[67vh] py-5">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
      <div className="w-full h-14 rounded-md flex items-center justify-between">
        <input type="text" className="w-9/10 h-full outline-0 px-5 border-2 border-zinc-100 rounded-md" placeholder="Enter a message"/>
        <button className="px-4 py-2 bg-blue-500 rounded-md">Send</button>
      </div>
    </div>
  );
};

export default Chat;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();

    if(user){
        navigate("/")
    }

  return (
    <div
      data-theme="black"
      className="w-screen h-[90vh] bg-gradient-to-br from-zinc-900 to-zinc-800 flex"
    >
      Get Started
    </div>
  );
};

export default GetStarted;

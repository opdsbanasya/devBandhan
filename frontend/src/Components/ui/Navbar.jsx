import { removeFeedData } from "@/store/userFeedSlice";
import { removeUser } from "@/store/userSlice";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TypingAnimation } from "../magicui/typing-animation";
import { ShinyButton } from "../magicui/shiny-button";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    dispatch(removeFeedData());
    navigate("/login");
  };

  return (
    <div
      data-theme="black"
      className="navbar shadow-sm px-5 md:px-10 lg::px-20 bg-base-100 h-[10vh]"
    >
      <div className="flex-1">
        <Link to={"/"} className="">
          <h1 class="text-xl md:text-3xl font-extrabold text-white tracking-wide animate-fade-in flex items-center gap-2">
            <span class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              &lt;/&gt; 
            </span>
            <span class="hidden md:block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              DevBandhan
            </span>
          </h1>
        </Link>
      </div>
      <div className="flex gap-10">
        {!user && (
          <div className="flex item-center gap-3 md:gap-5">
            <ShinyButton className="">
              <Link to={"/signup"}>Sign up</Link>
            </ShinyButton>
            <ShinyButton className="">
              <Link to={"/login"}>Login</Link>
            </ShinyButton>
          </div>
        )}
        {user && (
          <div className="dropdown dropdown-end flex gap-5">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                Welcome, <TypingAnimation>{user?.firstName}</TypingAnimation>
              </div>
            </div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-2 border-blue-500">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.profilePhoto}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-14 w-52 p-2 shadow-xl shadow-zinc-900"
            >
              <li>
                <Link
                  to={`/profile/${user._id}`}
                  className="justify-between text-[14px]"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/upgrade"} className="text-[14px]">
                  Upgrade
                </Link>
              </li>
              <li>
                <Link to={"/settings"} className="text-[14px]">
                  Settings
                </Link>
              </li>
              <li>
                <p className="text-[14px]" onClick={handleLogout}>
                  Logout
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

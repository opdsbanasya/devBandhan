import { removeFeedData } from "@/store/userFeedSlice";
import { removeUser } from "@/store/userSlice";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.post(
      BASE_URL + "/logout",
      {},
      { withCredentials: true }
    );
    dispatch(removeUser());
    dispatch(removeFeedData()); 
    navigate("/login");
  };

  return (
    <div
      data-theme="black"
      className="navbar shadow-sm px-20 bg-base-100 h-[10vh]"
    >
      <div className="flex-1">
        <Link to={"/feed"} className=" text-xl">
          🧑‍💻 Dev Tinder
        </Link>
      </div>
      <div className="flex gap-10">
        {!user && (
          <div className="flex item-center gap-5">
            <button className="px-5 py-1 font-semibold rounded-full cursor-pointer border hover:bg-green-100 hover:text-green-500 transition-all duration-500">
              <Link to={"/signup"}>Sign up</Link>
            </button>
            <button className="px-5 py-1 font-semibold rounded-full cursor-pointer border hover:bg-blue-100 hover:text-blue-500 transition-all duration-500">
              <Link to={"/login"}>Login</Link>
            </button>
          </div>
        )}
        {user && (
          <div className="dropdown dropdown-end flex gap-10">
            <div className="flex items-center">
              <p>Welcome, {user?.firstName}</p>
            </div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
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
                <Link to={"/profile"} className="justify-between text-[14px]">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a className="text-[14px]">Settings</a>
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

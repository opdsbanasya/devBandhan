import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div data-theme="black" className="navbar shadow-sm px-20 bg-base-100 h-[10vh]">
      <div className="flex-1">
        <a className=" text-xl">🧑‍💻 Dev Tinder</a>
      </div>
      <div className="flex gap-10">
        <div className="flex item-center gap-5">
          <button className="px-5 font-semibold rounded-full cursor-pointer border hover:bg-green-100 hover:text-green-500 transition-all duration-500">
            <Link to={"/signup"}>Sign up</Link>
          </button>
          <button className="px-5 font-semibold rounded-full cursor-pointer border hover:bg-blue-100 hover:text-blue-500 transition-all duration-500">
            <Link to={"/login"}>Login</Link>
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

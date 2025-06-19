import { Facebook, Github, Instagram, Linkedin, SquarePen } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { AuroraText } from "../magicui/aurora-text";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  if (!user) return;

  const handleEditClick = (data) => {
    navigate("edit", {state: data});
  };
  return (
    <div
      data-theme="black"
      className="w-screen min-h-[90vh] bg-gradient-to-br from-zinc-900 to-black text-white"
    >
      <div className="w-full">
        <div className="w-full py-10">
          <div className="w-10/12 mx-auto flex items-center gap-10">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#2e5bef] shadow-md">
              <img
                alt="Profile Photo"
                src={user?.profilePhoto}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold bg-clip-text text-transparent">
                <AuroraText>
                  {" "}
                  {user?.firstName} {user?.lastName}
                </AuroraText>
              </h2>
              <p className="text-lg text-zinc-400">
                {user?.profession && user?.profession}
              </p>
            </div>
          </div>

          <div className="w-10/12 mx-auto flex justify-end gap-4 mt-6 border-b border-zinc-700 pb-4">
            <a href="#">
              <Github />
            </a>
            <a href="#">
              <Linkedin />
            </a>
            <a href="#">
              <Facebook />
            </a>
            <a href="#">
              <Instagram />
            </a>
          </div>
        </div>

        <div className="w-8/12 mx-auto space-y-10">
          {/* Basic Info */}
          <div className="border-b border-zinc-700 pb-4 relative">
            <p
              onClick={() => handleEditClick({ basicData: true })}
              className="absolute right-0 top-0 cursor-pointer"
            >
              <SquarePen />
            </p>
            <h4 className="text-xl font-semibold text-zinc-100 pb-2">
              Basic Info
            </h4>
            <ul className="text-zinc-300 space-y-2">
              <li>
                <span className="w-20 inline-block font-semibold">Gender:</span>
                {user?.gender}
              </li>
              <li>
                <span className={`w-20 inline-block font-semibold `}>
                  Birthday:
                </span>
                <span className={`${!user?.dateOfBirth && "text-zinc-500"}`}>
                  {user?.dateOfBirth
                    ? user?.dateOfBirth.split("T")[0]
                    : "YYYY-MM-DD"}
                </span>
              </li>
              <li>
                <span className="w-20 inline-block font-semibold">Age:</span>
                {user?.age}
              </li>
              <li>
                <span className="w-20 inline-block font-semibold">About:</span>
                {user?.about}
              </li>
            </ul>
          </div>

          {/* Skills */}
          <div className="border-b border-zinc-700 pb-4">
            <h4 className="text-xl font-semibold text-zinc-100 pb-2">Skills</h4>
            <div className="flex flex-wrap gap-3 relative">
              {user?.skills && user?.skills.length !== 0 ? (
                user?.skills.map((skill, index) => (
                  <p
                    key={index}
                    className="px-3 py-1 rounded-md bg-[#FFFACD]/10 text-[#FFFACD] text-sm tracking-wide"
                  >
                    {skill}
                  </p>
                ))
              ) : (
                <p className="text-sm text-zinc-500">
                  No Skills.{" "}
                </p>
              )}
              <p
                onClick={() => handleEditClick({ skills: true })}
                className="absolute right-0 -top-7 text-sm font-medium text-zinc-400 hover:text-blue-400 cursor-pointer transition-colors duration-200"
              >
                + Add
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="border-b border-zinc-700 pb-4">
            <h4 className="text-xl font-semibold text-zinc-100 pb-2">
              Awards & Achievements
            </h4>
            <div className="flex flex-wrap gap-3 pb-5 relative">
              {user?.achievements && user?.achievements.length !== 0 ? (
                user?.achievements.map((achievement, index) => (
                  <p
                    key={index}
                    className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-300 text-sm tracking-wide"
                  >
                    {achievement}
                  </p>
                ))
              ) : (
                <p className="text-sm text-zinc-500">
                  No Award & Achievements.{" "}
                </p>
              )}
              <p
                onClick={() => handleEditClick({ achievements: true })}
                className="absolute right-0 -top-7 text-sm font-medium text-zinc-400 hover:text-blue-400 cursor-pointer transition-colors duration-200"
              >
                + Add
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 transform -translate-1/2 bg-transparent">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;

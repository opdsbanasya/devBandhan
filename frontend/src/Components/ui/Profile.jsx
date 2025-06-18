import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { AuroraText } from "../magicui/aurora-text";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div
      data-theme="black"
      className="w-screen min-h-[90vh] bg-gradient-to-br from-zinc-900 to-black text-white"
    >
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
            <p className="text-lg text-zinc-400">Cricketer</p>
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
        <div className="border-b border-zinc-700 pb-4">
          <h4 className="text-xl font-semibold text-zinc-100 pb-2">
            Basic Info
          </h4>
          <ul className="text-zinc-300 space-y-2">
            <li>
              <span className="w-20 inline-block font-semibold">Gender:</span>
              {user?.gender}
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
          <div className="flex flex-wrap gap-3">
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
                No Award & Achievements.{" "}
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Add
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="border-b border-zinc-700 pb-4">
          <h4 className="text-xl font-semibold text-zinc-100 pb-2">
            Awards & Achievements
          </h4>
          <div className="flex flex-wrap gap-3 pb-5">
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
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Add
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

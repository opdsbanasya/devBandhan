import { Facebook, Github, Instagram, Linkedin, SquarePen } from "lucide-react";
import { MdEdit } from "react-icons/md";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AuroraText } from "../magicui/aurora-text";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isEditIconHidden, setIsEditIconHidden] = useState(true);

  if (!user) return;

  const handleEditClick = (data) => {
    navigate("edit", { state: data });
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
  };
  return (
    <div
  data-theme="black"
  className="w-screen min-h-[90vh] bg-gradient-to-br from-zinc-900 to-black text-white"
>
  <div className="w-full">
    <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10">
      {/* Profile Header Section */}
      <div className="w-11/12 sm:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
        {/* Profile Image */}
        <div
          onMouseOver={() => setIsEditIconHidden(false)}
          onMouseOut={() => setIsEditIconHidden(true)}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 sm:ring-3 md:ring-4 ring-[#2e5bef] shadow-md relative cursor-pointer flex-shrink-0"
        >
          <img
            alt="Profile Photo"
            src={user?.profilePhoto}
            className="w-full h-full object-cover"
          />
          <div
            onClick={() => !isEditIconHidden && handleEditClick({ profileImage: true })}
            className={`w-full h-full flex items-center ${
              isEditIconHidden ? "hidden" : "block"
            } justify-center bg-transparent hover:bg-zinc-500/75 hover:text-white absolute top-0 text-black z-10 transition-all duration-200 cursor-pointer`}
          >
            <MdEdit className="bg-transparent text-lg sm:text-xl md:text-2xl transition-all duration-200" />
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent mb-2 md:mb-3">
            <AuroraText>
              {user?.firstName} {user?.lastName}
            </AuroraText>
          </h2>
          <p className="text-base md:text-lg text-zinc-400">
            {user?.profession ? (
              user?.profession
            ) : (
              <span
                onClick={() => handleEditClick({ profession: true })}
                className="text-sm font-medium text-zinc-400 hover:text-blue-400 cursor-pointer transition-colors duration-200"
              >
                Add Profession
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="w-11/12 sm:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto flex justify-center sm:justify-end gap-3 sm:gap-4 mt-4 sm:mt-6 border-b border-zinc-700 pb-3 sm:pb-4">
        <a href="#" className="hover:scale-110 transition-transform duration-200">
          <Github />
        </a>
        <a href="#" className="hover:scale-110 transition-transform duration-200">
          <Linkedin />
        </a>
        <a href="#" className="hover:scale-110 transition-transform duration-200">
          <Facebook />
        </a>
        <a href="#" className="hover:scale-110 transition-transform duration-200">
          <Instagram />
        </a>
      </div>
    </div>

    {/* Content Sections */}
    <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mx-auto space-y-6 sm:space-y-8 lg:space-y-10 px-2 sm:px-0">
      {/* Basic Info */}
      <div className="border-b border-zinc-700 pb-4 sm:pb-6 relative">
        <p
          onClick={() => handleEditClick({ basicData: true })}
          className="absolute right-0 top-0 cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          <SquarePen />
        </p>
        <h4 className="text-lg sm:text-xl font-semibold text-zinc-100 pb-2 sm:pb-3">
          Basic Info
        </h4>
        <ul className="text-zinc-300 space-y-2 sm:space-y-3">
          <li className="flex sm:flex-row sm:items-center justify-start">
            <span className="w-20 md:w-24 inline-block font-semibold text-sm sm:text-base">
              Gender:
            </span>
            <span className="text-sm sm:text-base uppercase">{user?.gender}</span>
          </li>
          <li className="flex sm:flex-row sm:items-center">
            <span className="w-20 md:w-24 inline-block font-semibold text-sm sm:text-base">
              Birthday:
            </span>
            <span className={`text-sm sm:text-base ${!user?.dateOfBirth && "text-zinc-500"}`}>
              {user?.dateOfBirth
                ? user?.dateOfBirth.split("T")[0]
                : "YYYY-MM-DD"}
            </span>
          </li>
          <li className="flex sm:flex-row sm:items-center">
            <span className="w-20 md:w-24 inline-block font-semibold text-sm sm:text-base">
              Age:
            </span>
            <span className="text-sm sm:text-base">{user?.age}</span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-start">
            <span className="w-full sm:w-20 md:w-24 inline-block font-semibold text-sm sm:text-base mb-1 sm:mb-0">
              About:
            </span>
            <span className="text-sm sm:text-base flex-1">{user?.about}</span>
          </li>
        </ul>
      </div>

      {/* Skills */}
      <div className="border-b border-zinc-700 pb-4 sm:pb-6">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <h4 className="text-lg sm:text-xl font-semibold text-zinc-100">
            Skills
          </h4>
          <p
            onClick={() => handleEditClick({ skills: true })}
            className="text-sm font-medium text-zinc-400 hover:text-blue-400 cursor-pointer transition-colors duration-200"
          >
            + Add
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {user?.skills && user?.skills.length !== 0 ? (
            user?.skills.map((skill, index) => (
              <p
                key={index}
                className="px-2 sm:px-3 py-1 rounded-md bg-[#FFFACD]/10 text-[#FFFACD] text-xs sm:text-sm tracking-wide"
              >
                {skill}
              </p>
            ))
          ) : (
            <p className="text-sm text-zinc-500">No Skills.</p>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="border-b border-zinc-700 pb-4 sm:pb-6">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <h4 className="text-lg sm:text-xl font-semibold text-zinc-100">
            Awards & Achievements
          </h4>
          <p
            onClick={() => handleEditClick({ achievements: true })}
            className="text-sm font-medium text-zinc-400 hover:text-blue-400 cursor-pointer transition-colors duration-200"
          >
            + Add
          </p>
          </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {user?.achievements && user?.achievements.length !== 0 ? (
            user?.achievements.map((achievement, index) => (
              <p
                key={index}
                className="px-2 sm:px-3 py-1 rounded-md bg-blue-500/10 text-blue-300 text-xs sm:text-sm tracking-wide"
              >
                {achievement}
              </p>
            ))
          ) : (
            <p className="text-sm text-zinc-500">
              No Award & Achievements.
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
  
  {/* Outlet positioned responsively */}
  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent w-11/12 sm:w-auto">
    <Outlet />
  </div>
</div>
  );
};

export default Profile;

import { editDataValidation } from "@/utils/validation";
import { Plus, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { updateUser } from "@/store/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation() || {};
  const dispatch = useDispatch();

  const { basicData, skills, achievements } = location.state || {};

  const about = useRef();
  const dateOfBirth = useRef();
  const male = useRef();
  const female = useRef();
  const other = useRef();
  const skillsNewData = useRef();
  const achievementsNewData = useRef();

  const handleEditInfo = async (e) => {
    e.preventDefault();
    editDataValidation({ about, dateOfBirth, male, female, other }, user, {
      basicData,
      skills,
      achievements,
    });
    navigate("/profile/" + user._id);
  };

  const handleAddChips = (e, field) => {
    try {
      e.preventDefault();
      let updatedField;
      if (field === "skills") {
        updatedField = skillsNewData.current.value;
        skillsNewData.current.value = "";
        dispatch(updateUser({ skills: [...user[field], updatedField] }));
      } else if (field === "achievements") {
        updatedField = achievementsNewData.current.value;
        achievementsNewData.current.value = "";
        dispatch(updateUser({ achievements: [...user[field], updatedField] }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveChips = (e, index, field) => {
    try {
      e.preventDefault();
      dispatch(
        updateUser(
          field === "skills"
            ? {
                skills: [
                  ...user?.skills.filter(
                    (skill, idx) => idx !== index && skill
                  ),
                ],
              }
            : {
                achievements: [
                  ...user?.achievements.filter(
                    (achievement, idx) => idx !== index && achievement
                  ),
                ],
              }
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      data-theme="black"
      className="w-screen h-[90vh] bg-transparent relative min-h-full flex items-center overflow-x-hidden"
    >
      <div className="relative w-[30%] min-h-[50%] rounded-lg shadow-2xl z-10 bg-base-300 py-5 mx-auto">
        <div className="space-y-4">
          <div className="px-10">
            <h5 className="text-xl font-semibold text-center shadow-lg mb-2">
              Edit Profile
            </h5>
            <p className="text-center italic text-sm">
              Enter your details below to edit you on <span>DevTinder</span>
            </p>
            <p
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => navigate("/profile/" + user._id)}
            >
              <X />
            </p>
          </div>
          <div className="">
            <form action="#" className="flex flex-col px-10 gap-2 relative">
              {/* Edit Basic Detail */}
              {basicData && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="gender"
                    className="pl-2 block font-medium text-zinc-300 mb-2"
                  >
                    Gender
                  </label>
                  <div className="flex gap-6 pl-2 mb-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        ref={male}
                        className="form-radio text-blue-500 focus:ring-blue-400"
                      />
                      <span className="text-zinc-200">Male</span>
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        ref={female}
                        className="form-radio text-pink-400 focus:ring-pink-300"
                      />
                      <span className="text-zinc-200">Female</span>
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                        ref={other}
                        className="form-radio text-violet-400 focus:ring-violet-300"
                      />
                      <span className="text-zinc-200">Other</span>
                    </label>
                  </div>

                  <label htmlFor="dob" className="pl-2 font-medium">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    ref={dateOfBirth}
                    required
                    className="text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-4 focus-within:border-zinc-400"
                  />

                  <label htmlFor="about" className={"pl-2 font-medium"}>
                    About
                  </label>
                  <textarea
                    type="text"
                    placeholder="About"
                    id="about"
                    name="about"
                    required
                    ref={about}
                    className="px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 focus-within:border-zinc-400 resize-none h-28"
                  />
                </div>
              )}

              {/* Skills */}
              {skills && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="skills" className="pl-2 font-medium">
                    Skills <span></span>
                  </label>
                  <span className="w-full flex items-center justify-between mb-4 gap-2">
                    <input
                      type="text"
                      id="skills"
                      name="skill"
                      placeholder="Enter Skills"
                      ref={skillsNewData}
                      required
                      className="w-11/12 text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm  focus-within:border-zinc-400"
                    />
                    <button
                      onClick={(e) => handleAddChips(e, "skills")}
                      className="px-2 py-2 bg-blue-100 text-blue-500 rounded-full cursor-pointer"
                    >
                      <Plus />
                    </button>
                  </span>

                  <div className="flex flex-wrap gap-3 relative mb-6">
                    {user?.skills &&
                      user?.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="flex items-center justify-between gap-2 px-3 py-1 bg-[#FFFACD]/10 rounded-md"
                        >
                          <p className="   text-[#FFFACD] text-sm tracking-wide">
                            {skill}
                          </p>
                          <p
                            onClick={(e) =>
                              handleRemoveChips(e, index, "skills")
                            }
                            className="text-red-500 cursor-pointer"
                          >
                            <RxCross2 />
                          </p>
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Achievements & Awards */}
              {achievements && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="achievements" className="pl-2 font-medium">
                    Achievements & Awards <span></span>
                  </label>
                  <span className="w-full flex items-center justify-between mb-4 gap-2">
                    <input
                      type="text"
                      id="achievements"
                      name="achievements"
                      ref={achievementsNewData}
                      placeholder="Enter achievements & awards"
                      required
                      className="w-11/12 text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm  focus-within:border-zinc-400"
                    />
                    <button
                      onClick={(e) => handleAddChips(e, "achievements")}
                      className="px-2 py-2 bg-blue-100 text-blue-500 rounded-full cursor-pointer"
                    >
                      <Plus />
                    </button>
                  </span>

                  <div className="flex flex-wrap gap-3 relative mb-6">
                    {user?.achievements &&
                      user?.achievements.map((achievement, index) => (
                        <span
                          key={index}
                          className="flex items-center justify-between gap-2 px-3 py-1 bg-[#FFFACD]/10 rounded-md"
                        >
                          <p className="   text-[#FFFACD] text-sm tracking-wide">
                            {achievement}
                          </p>
                          <p
                            onClick={(e) =>
                              handleRemoveChips(e, index, "achievements")
                            }
                            className="text-red-500 cursor-pointer"
                          >
                            <RxCross2 />
                          </p>
                        </span>
                      ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  className="px-3 py-2 text-blue-500 bg-blue-100 w-fit mx-auto rounded-md font-semibold cursor-pointer"
                  onClick={(e) => handleEditInfo(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;

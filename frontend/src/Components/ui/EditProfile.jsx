import { editDataValidation } from "@/utils/validation";
import { Plus, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { updateUser } from "@/store/userSlice";
import checkbox from "daisyui/components/checkbox";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation() || {};
  const dispatch = useDispatch();

  const { basicData, skills, achievements, profileImage, profession } =
    location.state || {};

  const about = useRef();
  const dateOfBirth = useRef();
  const male = useRef();
  const female = useRef();
  const other = useRef();
  const skillsNewData = useRef();
  const achievementsNewData = useRef();
  const profileImageLink = useRef();
  const professionData = useRef();

  const handleEditInfo = async (e) => {
    e.preventDefault();
    const editData = await editDataValidation(
      {
        about,
        dateOfBirth,
        male,
        female,
        other,
        profileImageLink,
        professionData,
      },
      user,
      {
        basicData,
        skills,
        achievements,
        profileImage,
        profession,
      }
    );
    if (basicData || profileImage || profession) {
      dispatch(updateUser(editData));
    }
    navigate("/profile/" + user._id);
    alert("Data Updated");
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
      className="w-screen h-[90vh] bg-transparent relative min-h-full flex items-center justify-center overflow-x-hidden px-4"
    >
      <div className="relative w-full md:w-[60%] lg:w-[50%] xl:w-[30%] max-w-2xl min-h-[40%] max-h-[85vh] mr-10 md:ml-10 rounded-lg shadow-2xl z-10 bg-base-300 py-4 sm:py-5 mx-auto overflow-y-auto">
        <div className="space-y-3 sm:space-y-4">
          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-10">
            <h5 className="text-lg sm:text-xl font-semibold text-center shadow-lg mb-2">
              Edit Profile
            </h5>
            <p className="text-center italic text-xs sm:text-sm">
              Enter your details below to edit you on <span>DevTinder</span>
            </p>
            <p
              className="absolute top-3 sm:top-5 right-3 sm:right-5 cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => navigate("/profile/" + user._id)}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </p>
          </div>

          {/* Form Container */}
          <div className="">
            <form
              action="#"
              className="flex flex-col px-4 sm:px-6 lg:px-10 gap-2 relative"
            >
              {/* Profile Image */}
              {profileImage && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="photo"
                    className="pl-2 font-medium py-2 sm:py-3 text-sm sm:text-base"
                  >
                    Enter the profile photo url
                  </label>
                  <input
                    type="text"
                    id="photo"
                    name="photo"
                    ref={profileImageLink}
                    placeholder="Enter photo URL"
                    required
                    className="text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 sm:mb-4 focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                  />
                </div>
              )}

              {/* Profession */}
              {profession && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="profession"
                    className="pl-2 font-medium py-2 sm:py-3 text-sm sm:text-base"
                  >
                    Enter your profession
                  </label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    ref={professionData}
                    required
                    className="text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 sm:mb-4 focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                  />
                </div>
              )}

              {/* Basic Data */}
              {basicData && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="gender"
                    className="pl-2 block font-medium text-zinc-300 mb-2 text-sm sm:text-base"
                  >
                    Gender
                  </label>
                  <div className="flex gap-3 sm:gap-6 pl-2 mb-3 sm:mb-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        ref={male}
                        className="form-radio text-blue-500 focus:ring-blue-400"
                      /> 
                      <span className="text-zinc-200 text-sm sm:text-base">
                        Male
                      </span>
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
                      <span className="text-zinc-200 text-sm sm:text-base">
                        Female
                      </span>
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
                      <span className="text-zinc-200 text-sm sm:text-base">
                        Other
                      </span>
                    </label>
                  </div>

                  <label
                    htmlFor="dob"
                    className="pl-2 font-medium text-sm sm:text-base"
                  >
                    Date of birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    ref={dateOfBirth}
                    required
                    className="text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 sm:mb-4 focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                  />

                  <label
                    htmlFor="about"
                    className="pl-2 font-medium text-sm sm:text-base"
                  >
                    About
                  </label>
                  <textarea
                    type="text"
                    placeholder="About"
                    id="about"
                    name="about"
                    required
                    ref={about}
                    className="px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 focus-within:border-zinc-400 focus-within:text-white h-20 sm:h-28 text-sm resize-y max-h-[30vh] min-h-[15vh] xl:min-h-[10vh]"
                  />
                </div>
              )}

              {/* Skills */}
              {skills && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="skills"
                    className="pl-2 font-medium text-sm sm:text-base"
                  >
                    Skills <span></span>
                  </label>
                  <div className="w-full flex items-center justify-between mb-3 sm:mb-4 gap-2">
                    <input
                      type="text"
                      id="skills"
                      name="skill"
                      placeholder="Enter Skills"
                      ref={skillsNewData}
                      required
                      className="flex-1 text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                    />
                    <button
                      onClick={(e) => handleAddChips(e, "skills")}
                      className="px-2 py-2 bg-blue-100 text-blue-500 rounded-full cursor-pointer hover:bg-blue-200 transition-colors duration-200 flex-shrink-0"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 relative mb-4 sm:mb-6">
                    {user?.skills &&
                      user?.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="flex items-center justify-between gap-2 px-2 sm:px-3 py-1 bg-[#FFFACD]/10 rounded-md"
                        >
                          <p className="text-[#FFFACD] text-xs sm:text-sm tracking-wide">
                            {skill}
                          </p>
                          <p
                            onClick={(e) =>
                              handleRemoveChips(e, index, "skills")
                            }
                            className="text-red-500 cursor-pointer hover:text-red-400 transition-colors duration-200"
                          >
                            <RxCross2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </p>
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Achievements & Awards */}
              {achievements && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="achievements"
                    className="pl-2 font-medium text-sm sm:text-base"
                  >
                    Achievements & Awards <span></span>
                  </label>
                  <div className="w-full flex items-center justify-between mb-3 sm:mb-4 gap-2">
                    <input
                      type="text"
                      id="achievements"
                      name="achievements"
                      ref={achievementsNewData}
                      placeholder="Enter achievements & awards"
                      required
                      className="flex-1 text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                    />
                    <button
                      onClick={(e) => handleAddChips(e, "achievements")}
                      className="px-2 py-2 bg-blue-100 text-blue-500 rounded-full cursor-pointer hover:bg-blue-200 transition-colors duration-200 flex-shrink-0"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 relative mb-4 sm:mb-6">
                    {user?.achievements &&
                      user?.achievements.map((achievement, index) => (
                        <span
                          key={index}
                          className="flex items-center justify-between gap-2 px-2 sm:px-3 py-1 bg-[#FFFACD]/10 rounded-md"
                        >
                          <p className="text-[#FFFACD] text-xs sm:text-sm tracking-wide">
                            {achievement}
                          </p>
                          <p
                            onClick={(e) =>
                              handleRemoveChips(e, index, "achievements")
                            }
                            className="text-red-500 cursor-pointer hover:text-red-400 transition-colors duration-200"
                          >
                            <RxCross2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </p>
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  className="px-4 sm:px-6 py-2 sm:py-3 text-blue-500 bg-blue-100 w-fit mx-auto rounded-md font-semibold cursor-pointer hover:bg-blue-200 transition-colors duration-200 text-sm sm:text-base"
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

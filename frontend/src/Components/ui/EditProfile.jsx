import { editDataValidation } from "@/utils/validation";
import { Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { updateUser } from "@/store/userSlice";
import { useForm } from "react-hook-form";
import { WordRotate } from "../magicui/word-rotate";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation() || {};
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isAddChipsButtonDisabled, setIsAddChipsButtonDisabled] =
    useState(false);

  const {
    isBasicData,
    isSkills,
    isAchievements,
    isProfileImage,
    isProfession,
    isLinks,
  } = location.state || {};

  const [inputErrors, setInputErrors] = useState({});

  const submitForm = async (data) => {
    try {
      console.log(data);
      const editData = await editDataValidation(data, user, setInputErrors, {
        isBasicData,
        isSkills,
        isAchievements,
        isProfileImage,
        isProfession,
        isLinks,
      });

      if (isBasicData || isProfileImage || isProfession || isLinks) {
        dispatch(updateUser(editData));
      }

      alert("Data updated");
      navigate("/profile/" + user?._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddChips = (field) => {
    try {
      let updatedField;
      if (field === "skills") {
        updatedField = watch()?.skills.length !== 0 && watch()?.skills;
        reset({ skills: "" });
        dispatch(updateUser({ skills: [...user[field], updatedField] }));
      } else if (field === "achievements") {
        updatedField =
          watch()?.achievements.length !== 0 && watch()?.achievements;
        reset({ achievements: "" });
        dispatch(updateUser({ achievements: [...user[field], updatedField] }));
      }
      if (user?.[field].length === 10) {
        setInputErrors(true);
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
      if (user?.[field].length > 10) {
        setInputErrors(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setInputErrors(errors);
  }, [errors]);

  return (
    <section
      data-theme="black"
      className="w-screen h-[90vh] bg-transparent relative min-h-full flex items-center justify-center overflow-x-hidden px-4"
      onSubmit={handleSubmit(submitForm)}
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
          <div className="w-full">
            <form
              action="#"
              className="flex flex-col px-4 sm:px-6 lg:px-10 gap-2 relative w-full"
            >
              {/* Profile Image */}
              {isProfileImage && (
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
                    {...register("profileImageLink", {
                      required: { value: true, message: "This is required" },
                    })}
                    placeholder="Enter photo URL"
                    className="text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 sm:mb-4 focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                  />
                </div>
              )}

              {/* Profession */}
              {isProfession && (
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
                    {...register("profession", {
                      required: { value: true, message: "This is required" },
                      minLength: {
                        value: 2,
                        message: "Minimum length must be 2",
                      },
                      maxLength: {
                        value: 40,
                        message: "Max length must be 40",
                      },
                    })}
                    defaultValue={user?.profession}
                    className="text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm  focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                  />{" "}
                  {errors?.profession && (
                    <span role="alert" className="">
                      <WordRotate
                        words={[errors?.profession?.message]}
                        className="text-xs text-left text-red-500"
                      />
                    </span>
                  )}
                </div>
              )}

              {/*Social links */}
              {isLinks && (
                <div className="flex flex-col gap-2 w-full">
                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base font-normal">
                      Select Social platform
                    </legend>
                    <select
                      defaultValue="Pick a browser"
                      className="select flex-1 w-full md:h-16 xl:h-fit text-zinc-500 p-2 md:px-4 xl:px-2  border border-zinc-500 outline-none rounded-sm focus-within:border-zinc-400 focus-within:text-white text-[14px] md:text-lg lg:text-2xl xl:text-base bg-base-300"
                      {...register("platformName")}
                    >
                      <option disabled={true} selected className="text-base">
                        Select a platform{" "}
                      </option>
                      <option value="github" className="text-base">
                        GitHub
                      </option>
                      <option value="linkedin" className="text-base">
                        LinkedIn
                      </option>
                      <option value="twitterX" className="text-base">
                        X
                      </option>
                      <option value="instagram" className="text-base">
                        Instagram
                      </option>
                    </select>
                  </fieldset>

                  <label
                    htmlFor="links"
                    className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                  >
                    Enter the links
                  </label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    {...register("platformUrl")}
                    placeholder="Enter URL"
                    required
                    className="p-2 md:p-4 xl:p-2 border border-zinc-500 outline-none rounded-sm mb-3 md:mb-5 focus-within:border-zinc-400 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                  />
                </div>
              )}

              {/* Basic Data */}
              {isBasicData && (
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
                        {...register("gender")}
                        id="male"
                        value="male"
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
                        {...register("gender")}
                        id="female"
                        value="female"
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
                        {...register("gender")}
                        id="other"
                        value="other"
                        className="form-radio text-violet-400 focus:ring-violet-300"
                      />
                      <span className="text-zinc-200 text-sm sm:text-base">
                        Other
                      </span>
                    </label>
                  </div>
                  {inputErrors?.gender && (
                    <span role="alert" className="">
                      <WordRotate
                        words={[inputErrors?.gender?.message]}
                        className="text-xs text-left text-red-500"
                      />
                    </span>
                  )}

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
                    {...register("dateOfBirth", {
                      required: { value: true, message: "This is required!" },
                    })}
                    defaultValue={
                      user?.dateOfBirth && user?.dateOfBirth.split("T")[0]
                    }
                    className="text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 sm:mb-4 focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                  />
                  {inputErrors?.dateOfBirth && (
                    <span role="alert" className="">
                      <WordRotate
                        words={[inputErrors?.dateOfBirth?.message]}
                        className="text-xs text-left text-red-500"
                      />
                    </span>
                  )}

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
                    {...register("about", {
                      required: { value: true, message: "This is required!" },
                      minLength: {
                        value: 10,
                        message: "Min length should be 10",
                      },
                      maxLength: {
                        value: 150,
                        message: "Max length should be 150",
                      },
                    })}
                    defaultValue={user?.about}
                    className="px-2 py-2 border border-zinc-500 outline-none rounded-sm focus-within:border-zinc-400 focus-within:text-white h-20 sm:h-28 text-sm resize-y max-h-[30vh] min-h-[15vh] xl:min-h-[10vh]"
                  />
                  {inputErrors?.about && (
                    <span role="alert" className="">
                      <WordRotate
                        words={[inputErrors?.about?.message]}
                        className="text-xs text-left text-red-500"
                      />
                    </span>
                  )}
                </div>
              )}

              {/* Skills */}
              {isSkills && (
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
                      {...register("skills")}
                      className="flex-1 text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddChips("skills")}
                      disabled={isAddChipsButtonDisabled}
                      className={`px-2 py-2 bg-blue-100 text-blue-500 rounded-full cursor-pointer hover:bg-blue-200 transition-colors duration-200 flex-shrink-0 disabled:bg-gray-500`}
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
              {isAchievements && (
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
                      {...register("achievements")}
                      placeholder="Enter achievements & awards"
                      className="flex-1 text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm focus-within:border-zinc-400 focus-within:text-white text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddChips("achievements")}
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

              {/* Errors */}
              <div>
                {inputErrors?.response && (
                  <span role="alert" className="">
                    <WordRotate
                      words={[inputErrors?.response?.message]}
                      className="text-xs text-left text-red-500"
                    />
                  </span>
                )}
              </div>
              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 sm:py-3 text-blue-500 bg-blue-100 w-fit mx-auto rounded-md font-semibold cursor-pointer hover:bg-blue-200 transition-colors duration-200 text-sm sm:text-base"
                >
                  Update
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

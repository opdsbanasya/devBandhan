import { X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  let gender = "";
  const about = useRef();
  const dateOfBirth = useRef();
  const male = useRef();
  const female = useRef();
  const other = useRef();

  const handleEditInfo = (e) => {
    e.preventDefault();
    if (male.current.checked) {
      gender = "male";
    } else if (female.current.checked) {
      gender = "female";
    } else if (other.current.checked) {
      gender = "other";
    }
    const editData = {
      about: about.current.value,
      dateOfBirth: dateOfBirth.current.value,
      gender
    };
    console.log(editData);
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
              onClick={() => navigate(-1)}
            >
              <X />
            </p>
          </div>
          <div className="">
            <form action="#" className="flex flex-col px-10 gap-2 relative">
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

              <div className="flex justify-center">
                <button
                  className="px-3 py-2 text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer"
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

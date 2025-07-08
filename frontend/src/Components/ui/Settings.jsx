import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import React, { useRef } from "react";

const Settings = () => {
  const oldInputPassword = useRef();
  const newInputPassword = useRef();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const passwordData = {
        password: oldInputPassword?.current?.value,
        newPassword: newInputPassword?.current?.value,
      };

      await axios.patch(`${BASE_URL}/profile/password/change`, passwordData, {
        withCredentials: true,
      });

      alert("Your Password has been changed ✅");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      data-theme="black"
      className="w-screen min-h-[90vh] bg-base-200 grid py-20"
    >
      <div className="w-11/12 md:w-1/2 xl:w-[30%] h-fit space-y-5 border border-zinc-500 p-10 rounded-lg mx-auto">
        <div className="space-y-5">
          <h5 className="text-xl md:text-2xl lg:text-4xl xl:text-xl font-semibold text-center">
            Change Password
          </h5>
          <p className="text-xs md:text-base lg:text-xl xl:text-sm text-center text-zinc-300 italic">
            Enter your old credential and new credential below change your
            credential
          </p>
        </div>

        <form className="">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="oldPassword" className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base">
              Old Password
            </label>
            <input
              type="password"
              placeholder="Old Password"
              id="oldPassword"
              name="oldPassword"
              ref={oldInputPassword}
              className="p-2 md:p-4 xl:p-2 border border-zinc-500 outline-none rounded-sm mb-3 md:mb-5 focus-within:border-zinc-400 text-[14px] md:text-lg lg:text-2xl xl:text-base"
            />

            <label htmlFor="newPassword" className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base">
              New Password
            </label>
            <input
              type="password"
              placeholder="New Password"
              id="newPassword"
              name="newPassword"
              ref={newInputPassword}
              className="p-2 md:p-4 xl:p-2 border border-zinc-500 outline-none rounded-sm mb-3 md:mb-5 focus-within:border-zinc-400 text-[14px] md:text-lg lg:text-2xl xl:text-base"
            />

            <button
              onClick={(e) => handleChangePassword(e)}
              className="px-2 md:px-3 lg:px-5 xl:px-3 py-1 md:py-2 lg:py-3 xl:py-2 text-sm md:text-base lg:text-2xl xl:text-base text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer mt-5 md:mt-10"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;

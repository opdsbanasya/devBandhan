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
    <div className="w-3/4 h-full bg-transparent flex items-center justify-center relative flex-wrap gap-5">
      <div className="w-1/2 space-y-5 border border-zinc-500 p-10 rounded-lg">
        <div className="space-y-5">
          <h5 className="text-xl font-semibold text-center">Change Password</h5>
          <p className=" text-sm text-center italic text-wrap text-zinc-400">
            Enter your old credential and new credential below change your
            credential
          </p>
        </div>

        <form className="">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="oldPassword" className="pl-2">
              Old Password
            </label>
            <input
              type="password"
              placeholder="Old Password"
              id="oldPassword"
              name="oldPassword"
              ref={oldInputPassword}
              className="px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-5 focus-within:border-zinc-400"
            />

            <label htmlFor="newPassword" className="pl-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="New Password"
              id="newPassword"
              name="newPassword"
              ref={newInputPassword}
              className="px-2 py-2 border border-zinc-500 outline-none rounded-sm focus-within:border-zinc-400"
            />

            <button
              onClick={(e) => handleChangePassword(e)}
              className="px-3 py-2 text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer mt-10"
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

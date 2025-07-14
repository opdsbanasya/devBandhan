import React, { useEffect, useState } from "react";
import { WordRotate } from "../magicui/word-rotate";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ isOTPVerified, userEmail, setIsOTPVerified }) => {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("password");
  const [passwordType, setPasswordType] = useState("password");
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState("");
  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setError("Password not matching...");
    }
    if (newPassword === confirmPassword) {
      setError("");
    }
  }, [confirmPassword]);

  const handleUpdatePassword = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.patch(`${BASE_URL}/reset/password/`, {
        email: userEmail,
        newPassword,
      });

      if (response.status === 404) {
        setError("Account not found!")
        setIsOTPVerified(false);
      }
      if (response?.status === 200) {
        setIsOk(true);
        setError("")
        const timer = setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="space-y-2 lg:space-y-5 py-5 md:py-10">
      <div className="space-y-2 lg:space-y-5">
        <h5 className="text-xl md:text-2xl lg:text-4xl xl:text-xl font-semibold text-center">
          Forget password
        </h5>
        (
        <p className="text-xs md:text-base lg:text-xl xl:text-sm text-center">
          Enter a new strong password
        </p>
        )
        <p className="text-7xl lg:text-9xl xl:text-7xl text-center hidden md:block">
          🧑‍💻
        </p>
      </div>
      <div className="">
        {error !== "" && (
          <WordRotate
            words={[error]}
            className="text-center py-3 text-red-500"
          />
        )}

        {isOk && (
          <WordRotate
            words={["Password updated", "Please Login with new password!"]}
            className="text-center py-3 text-green-500"
          />
        )}
        <form className="">
          <div className="flex flex-col px-5 md:px-10 gap-1 lg:gap-2 xl:gap-1">
            <label
              htmlFor="newpassword"
              className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base md:mt-5"
            >
              New Password
            </label>
            <div className="w-full flex items-center justify-between border border-zinc-500 rounded-sm focus-within:border-zinc-400">
              <input
                type={inputType}
                placeholder="New password"
                id="newpassword"
                name="newpassword"
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="flex-1 text-zinc-500 p-2 md:p-4 xl:p-2 outline-none focus-within:text-white text-[14px] md:text-lg lg:text-2xl xl:text-base"
              />
              {inputType === "password" && (
                <button
                  type="button"
                  className="px-2 py-2 rounded-full cursor-pointer transition-colors duration-200 flex-shrink-0"
                  onClick={(e) => setInputType("text")}
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
              {inputType === "text" && (
                <button
                  type="button"
                  className="px-2 py-2 rounded-full cursor-pointer transition-colors duration-200 flex-shrink-0"
                  onClick={(e) => setInputType("password")}
                >
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            <label
              htmlFor="confirmpassword"
              className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base mt-5"
            >
              Confirm Password
            </label>
            <div className="w-full flex items-center justify-between border border-zinc-500 rounded-sm focus-within:border-zinc-400">
              <input
                type={passwordType}
                placeholder="Confirm password"
                id="confirmpassword"
                name="confirmpassword"
                onChange={(e) => setConfirmPassword(e.target?.value)}
                required
                className="flex-1 text-zinc-500 p-2 md:p-4 xl:p-2 outline-none focus-within:text-white text-[14px] md:text-lg lg:text-2xl xl:text-base"
              />
              {passwordType === "password" && (
                <button
                  type="button"
                  className="px-2 py-2 rounded-full cursor-pointer transition-colors duration-200 flex-shrink-0"
                  onClick={(e) => setPasswordType("text")}
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
              {passwordType === "text" && (
                <button
                  type="button"
                  className="px-2 py-2 rounded-full cursor-pointer transition-colors duration-200 flex-shrink-0"
                  onClick={(e) => setPasswordType("password")}
                >
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => handleUpdatePassword(e)}
              className="px-2 md:px-3 lg:px-5 xl:px-3 py-1 md:py-2 lg:py-3 xl:py-2 text-sm md:text-base lg:text-2xl xl:text-base text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer mt-5 md:mt-10"
            >
              Update
            </button>
          </div>
        </form>
        <div className="px-5 md:px-10 py-5 flex justify-between">
          <p
            className="text-sm text-blue-500 font-semibold hover:underline hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

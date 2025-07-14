import React, { useEffect, useRef, useState } from "react";
import Alert from "../magicui/alert";
import bgImageloginDesktop from "../../assets/bgImageDesktop.webp";
import { BorderBeam } from "../magicui/border-beam";
import { WordRotate } from "../magicui/word-rotate";
import { BASE_URL } from "@/utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import ResetPassword from "./ResetPassword";
import { useSelector } from "react-redux";

const OtpVerification = () => {
  const otpRef = useRef();
  const [error, setError] = useState();
  const location = useLocation() || {};
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const navigate = useNavigate();
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(null);
  const [userEmail, setUserEmail] = useState();
  const [isPasswordForget, setIsPasswordForget] = useState(
    location.state?.isForgetPassword || false
  );

  const sendOtp = async (e) => {
    try {
      e.preventDefault();

      if (!userEmail || !validator.isEmail(userEmail)) {
        setError("Please Enter a valid email");
      }

      const response = await axios.post(`${BASE_URL}/authcode/send`, {
        email: userEmail,
      });

      if (response?.status === 200) {
        setError("");
        setIsOTPSent(true);
        setIsChangeEmail(false);
      }
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    try {
      e.preventDefault();
      setIsOTPSent(false);
      if (!userEmail || !validator.isEmail(userEmail)) {
        setError("Please enter a valid email");
      }

      if (otpRef.current.value.length !== 6) {
        setError("Invalid OTP");
      } else {
        setError("");
      }

      const response = await axios.post(`${BASE_URL}/authcode/verify`, {
        otpFromUser: otpRef.current.value,
        email: userEmail,
      });

      if (response?.status === 200) {
        setIsOTPVerified(true);
        // if (!isPasswordForget) {
        //   const timer = setTimeout(() => {
        //     navigate("/login");
        //   }, 4000);
        // }
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    setIsOTPVerified(false);
    if (!location.state?.email) {
      setIsChangeEmail(true);
    }
    if (location.state?.email) {
      setUserEmail(location.state?.email);
    }
  }, []);

  return (
    <section
      data-theme="black"
      className="w-screen min-h-[90vh] bg-base-200 grid"
    >
      <div className="relative w-full h-full flex xl:items-center overflow-x-hidden py-5 md:py-10 xl:py-0">
        {/* Card 2 - behind */}
        <div className="absolute w-[90%] xl:w-[70%] xl:h-[90%] rounded-lg shadow-lg z-0 lg:right-0 left-1/2 -translate-x-1/2 xl:-translate-x-1/4 overflow-hidden">
          <img
            alt="login-image"
            className="w-full h-full object-cover "
            src={bgImageloginDesktop}
          />
        </div>

        {/* Card 1 - front */}
        <div className="relative w-[80%] md:w-[60%] xl:w-[30%] h-fit rounded-lg shadow-2xl z-10 transform xl:translate-x-30 translate-y-40 md:translate-y-60 xl:translate-y-0 bg-base-300 mx-auto xl:mx-0">
          {isOTPVerified && isPasswordForget ? (
            <ResetPassword
              isOTPVerified={isOTPVerified}
              userEmail={userEmail}
              setIsOTPVerified={setIsOTPVerified}
            />
          ) : (
            <div className="space-y-2 lg:space-y-5 py-5 md:py-10">
              <div className="space-y-2 lg:space-y-5">
                <h5 className="text-xl md:text-2xl lg:text-4xl xl:text-xl font-semibold text-center">
                  Verification
                </h5>
                {isOTPSent && (
                  <p className="text-xs md:text-base lg:text-xl xl:text-sm text-center">
                    Enter 6 digit OTP recieved on email to verify
                  </p>
                )}
                {isChangeEmail && (
                  <p className="text-xs md:text-base lg:text-xl xl:text-sm text-center text-wrap">
                    Enter 6 digit OTP recieved on your email
                    <span className="font-semibold">
                      <br />
                      {userEmail}{" "}
                    </span>
                    {!isChangeEmail && (
                      <span
                        className="text-blue-500 font-semibold hover:underline hover:text-blue-400 cursor-pointer"
                        onClick={() => setIsChangeEmail(true)}
                      >
                        Change
                      </span>
                    )}
                  </p>
                )}
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
                {isOTPVerified && (
                  <WordRotate
                    words={
                      isPasswordForget
                        ? ["OTP verified!"]
                        : ["OTP verified!", "Please login..."]
                    }
                    className="text-center py-3 text-green-500"
                  />
                )}
                {isOTPSent && (
                  <WordRotate
                    words={["OTP sent!"]}
                    className="text-center py-3 text-green-500"
                  />
                )}
                <form className="">
                  <div className="flex flex-col px-5 md:px-10 gap-1 lg:gap-2 xl:gap-1">
                    <label
                      htmlFor="email"
                      className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                    >
                      Email
                    </label>
                    <div className="w-full flex items-center justify-between border border-zinc-500 rounded-sm focus-within:border-zinc-400">
                      {isChangeEmail && (
                        <input
                          type="email"
                          placeholder="Email"
                          id="email"
                          name="email"
                          onChange={(e) => setUserEmail(e.target.value)}
                          value={userEmail}
                          className="flex-1 text-zinc-500 p-2 md:p-4 xl:p-2 outline-none focus-within:text-white text-[14px] md:text-lg lg:text-2xl xl:text-base"
                        />
                      )}
                      {!isChangeEmail && (
                        <p
                          style={{ scrollbarWidth: "none" }}
                          className="w-[90%] overflow-x-scroll scrollbar-hide flex-1 p-2 md:p-4 xl:p-2 outline-none text-[14px] md:text-lg lg:text-2xl xl:text-base"
                        >
                          {userEmail}
                        </p>
                      )}
                      {
                        <button
                          type="button"
                          className="px-3 text-blue-500 hover:underline hover:text-blue-400 cursor-pointer"
                          onClick={(e) => sendOtp(e)}
                        >
                          Get
                        </button>
                      }
                    </div>

                    <label
                      htmlFor="password"
                      className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base mt-5"
                    >
                      OTP
                    </label>
                    <div className="w-full flex items-center justify-between border border-zinc-500 rounded-sm focus-within:border-zinc-400">
                      <input
                        type="text"
                        placeholder="One Time Password"
                        id="password"
                        name="password"
                        ref={otpRef}
                        required
                        className="flex-1 text-zinc-500 p-2 md:p-4 xl:p-2 outline-none focus-within:text-white text-[14px] md:text-lg lg:text-2xl xl:text-base"
                      />
                    </div>

                    <button
                      className="px-2 md:px-3 lg:px-5 xl:px-3 py-1 md:py-2 lg:py-3 xl:py-2 text-sm md:text-base lg:text-2xl xl:text-base text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer mt-5 md:mt-10"
                      onClick={(e) => handleVerifyOtp(e)}
                    >
                      Verify
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <BorderBeam />
        </div>
      </div>
    </section>
  );
};

export default OtpVerification;

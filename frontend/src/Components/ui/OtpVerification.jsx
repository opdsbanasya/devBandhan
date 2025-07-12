import React, { useRef, useState } from "react";
import Alert from "../magicui/alert";
import bgImageloginDesktop from "../../assets/bgImageDesktop.webp";
import { BorderBeam } from "../magicui/border-beam";
import { WordRotate } from "../magicui/word-rotate";
import { BASE_URL } from "@/utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OtpVerification = () => {
  const otpRef = useRef();
  const [error, setError] = useState();
  const location = useLocation() || {};
  const [isOk, setIsOk] = useState(null);
  const navigate = useNavigate();

  console.log(location.state?.email);

  const handleVerifyOtp = async (e) => {
    try {
      e.preventDefault();
      console.log(otpRef.current.value);

      if (otpRef.current.value.length !== 6) {
        setError("Invalid OTP");
      } else {
        setError("");
      }

      const response = await axios.post(`${BASE_URL}/authcode/verify`, {
        otpFromUser: otpRef.current.value,
        email: location.state?.email || "dharm.2245832@mygyanvihar.com",
      });
      console.log(response);
      if (response?.data?.status === 200) {
        setIsOk(true);

        const timer = setTimeout(() => {
          console.log("hello");
          navigate("/login");
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
    }
  };

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
          <div className="space-y-2 lg:space-y-5 py-5 md:py-10">
            <div className="space-y-2 lg:space-y-5">
              <h5 className="text-xl md:text-2xl lg:text-4xl xl:text-xl font-semibold text-center">
                Verification
              </h5>
              <p className="text-xs md:text-base lg:text-xl xl:text-sm text-center">
                Enter 6 digit OTP recieved on email to verify
              </p>
              <p className="text-7xl lg:text-9xl xl:text-7xl text-center hidden md:block">
                🧑‍💻
              </p>
            </div>
            <div className="md:pt-5">
              {error !== "" && (
                <WordRotate
                  words={[error]}
                  className="text-center py-3 text-red-500"
                />
              )}
              {isOk && (
                <WordRotate
                  words={["OTP verified!", "Please login..."]}
                  className="text-center py-3 text-green-500"
                />
              )}
              <form className="">
                <div className="flex flex-col px-5 md:px-10 gap-1 lg:gap-2 xl:gap-1">
                  <label
                    htmlFor="password"
                    className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base"
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
              <div className="px-5 md:px-10 py-5 flex justify-between">
                <p className="text-xs md:text-base lg:text-xl xl:text-sm text-blue-400 underline ">
                  Resend
                </p>
              </div>
            </div>
          </div>
          <BorderBeam />
        </div>
      </div>
    </section>
  );
};

export default OtpVerification;

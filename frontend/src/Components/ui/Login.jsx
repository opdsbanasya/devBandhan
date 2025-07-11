import React, { useRef, useState } from "react";
import { BorderBeam } from "../magicui/border-beam";
import { Link, useNavigate } from "react-router-dom";
import { loginDataValiadation } from "@/utils/validation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { BASE_URL } from "@/utils/constants";
import bgImageloginDesktop from "../../assets/bgImageDesktop.webp";
import { Eye, EyeOff } from "lucide-react";
import { WordRotate } from "../magicui/word-rotate";
import Alert from "../magicui/alert";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("password");
  const [error, setError] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email: email.current.value.trim(),
        password: password.current.value,
      };
      const isOk = loginDataValiadation(loginData, setError);

      if (isOk) {
        const user = await axios.post(BASE_URL + "/login", loginData, {
          withCredentials: true,
        });

        console.log(user);

        setIsAlert(true);
        const timer = setTimeout(() => {
          dispatch(addUser(user?.data?.userData));
          navigate("/");
        }, 3000);

        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <section
      data-theme="black"
      className="w-screen min-h-[90vh] bg-base-200 grid"
    >
      <div className="relative w-full h-full flex xl:items-center overflow-x-hidden py-5 md:py-10 xl:py-0">
        <Alert message={"success"} isAlert={isAlert} setIsAlert={setIsAlert} />

        {/* Card 2 - behind */}
        <div className="absolute w-[90%] xl:w-[70%] xl:h-[90%] rounded-lg shadow-lg z-0 lg:right-0 left-1/2 -translate-x-1/2 xl:-translate-x-1/4 overflow-hidden">
          <img
            alt="login-image"
            className="w-full h-full object-cover "
            src={bgImageloginDesktop}
          />
        </div>

        {/* Card 1 - front */}
        <div className="relative w-[80%] md:w-[60%] xl:w-[30%] h-fit xl:h-[85%] rounded-lg shadow-2xl z-10 transform xl:translate-x-30 translate-y-40 md:translate-y-60 xl:translate-y-0 bg-base-300 mx-auto xl:mx-0">
          <div className="space-y-2 lg:space-y-5 py-5 md:py-10">
            <div className="space-y-2 lg:space-y-5">
              <h5 className="text-xl md:text-2xl lg:text-4xl xl:text-xl font-semibold text-center">
                Login
              </h5>
              <p className="text-xs md:text-base lg:text-xl xl:text-sm text-center">
                Enter your credential below to access your account
              </p>
              <p className="text-7xl lg:text-9xl xl:text-7xl text-center hidden md:block">
                🧑‍💻
              </p>
            </div>
            <div className="pt-5">
              {error !== "" && (
                <WordRotate
                  words={[error]}
                  className="text-center py-3 text-red-500"
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
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    ref={email}
                    className="p-2 md:p-4 xl:p-2 border border-zinc-500 outline-none rounded-sm mb-3 md:mb-5 focus-within:border-zinc-400 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                  />

                  <label
                    htmlFor="password"
                    className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                  >
                    Password
                  </label>
                  <div className="w-full flex items-center justify-between border border-zinc-500 rounded-sm focus-within:border-zinc-400">
                    <input
                      type={inputType}
                      placeholder="Password"
                      id="password"
                      name="password"
                      ref={password}
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

                  <button
                    className="px-2 md:px-3 lg:px-5 xl:px-3 py-1 md:py-2 lg:py-3 xl:py-2 text-sm md:text-base lg:text-2xl xl:text-base text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer mt-5 md:mt-10"
                    onClick={(e) => handleLogin(e)}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="px-5 md:px-10 py-5 flex justify-between">
                <p className="text-xs md:text-base lg:text-xl xl:text-sm">
                  Have not account?{" "}
                  <Link
                    to={"/signup"}
                    className="text-blue-400 underline font-semibold"
                  >
                    Sign up
                  </Link>
                </p>
                <p className="text-xs md:text-base lg:text-xl xl:text-sm text-blue-400 underline ">
                  Forget Password
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

export default Login;

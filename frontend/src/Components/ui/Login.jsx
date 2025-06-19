import React, { useRef } from "react";
import { BorderBeam } from "../magicui/border-beam";
import { Link, useNavigate } from "react-router-dom";
import { loginDataValiadation } from "@/utils/validation";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser} from "../../store/userSlice";
import { BASE_URL } from "@/utils/constants";
import bgImagelogin from "../../assets/match-image-2.webp"

const Login = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch(); 
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email: email.current.value.trim(),
        password: password.current.value,
      };
      const isOk = loginDataValiadation(
        loginData
      );

      if(isOk){
        const user = await axios.post(BASE_URL + "/login", loginData, {withCredentials: true});

        dispatch(addUser(user?.data?.userData))
        navigate("/")
      }
    } catch (err) {
      console.log("ERROR" + err.message);
    }
  };

  return (
    <section
      data-theme="black"
      className="w-screen min-h-[90vh] bg-base-200 grid"
    >
      <div className="relative w-full h-full flex items-center overflow-x-hidden">
        {/* Card 2 - behind */}
        <div className="absolute w-[70%] h-[90%] bg-blue-300 rounded-lg shadow-lg z-0 right-0 overflow-hidden">
          <img
            alt="signup-image"
            className="w-full h-full object-cover"
            src={bgImagelogin}
          />
        </div>

        {/* Card 1 - front */}
        <div className="relative w-[30%] h-[85%] rounded-lg shadow-2xl z-10 transform translate-x-30 bg-base-300">
          <div className="space-y-5 py-10">
            <div className="space-y-5">
              <h5 className="text-xl font-semibold text-center">Login</h5>
              <p className=" text-center">
                Enter your credential below to access your accont
              </p>
              <p className="text-7xl text-center">🧑‍💻</p>
            </div>
            <div className="">
              <form className="">
                <div className="flex flex-col px-10 gap-1 pt-10">
                  <label htmlFor="email" className="pl-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    ref={email}
                    className="px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-5 focus-within:border-zinc-400"
                  />

                  <label htmlFor="password" className="pl-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    ref={password}
                    className="px-2 py-2 border border-zinc-500 outline-none rounded-sm focus-within:border-zinc-400"
                  />

                  <button
                    className="px-3 py-2 text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer mt-10"
                    onClick={(e) => handleLogin(e)}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="px-10 py-5 flex justify-between">
                <p className="text-sm">
                  Have not account?{" "}
                  <Link
                    to={"/signup"}
                    className="text-blue-400 underline font-semibold"
                  >
                    Sign up
                  </Link>
                </p>
                <p className="text-sm text-blue-400 underline ">
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

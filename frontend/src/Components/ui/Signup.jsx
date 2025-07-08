import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpDataValidation } from "@/utils/validation";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/userSlice";
import bgImagesignup from "../../assets/match-image-1.webp";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const dateOfBirth = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      dateOfBirth: dateOfBirth.current.value,
    };
    const validateData = signUpDataValidation(signupData);

    const isNoError = Object.keys(validateData).length === 0;
    if (isNoError) {
      try {
        const res = await axios.post(`${BASE_URL}/signup`, signupData);
        dispatch(addUser(res.data.userData));
        console.log(res.data.userData);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section data-theme="black" className="w-screen h-[90vh] bg-base-200 grid">
      <section className="relative w-full h-full flex xl:items-center overflow-x-hidden py-5 md:py-10">
        {/* Card 2 - behind */}
        <div className="absolute w-[90%] xl:w-[70%] xl:h-[90%] rounded-lg shadow-lg z-0 lg:right-0 left-1/2 -translate-x-1/2 xl:-translate-x-1/4 overflow-hidden">
          <img
            alt="login-image"
            className="w-full h-full object-cover "
            src={bgImagesignup}
          />
        </div>

        {/* Card 1 - front */}
        <div className="relative w-[80%] md:w-[60%] xl:w-[30%] h-fit rounded-lg shadow-2xl z-10 transform xl:translate-x-30 translate-y-40 md:translate-y-60 xl:translate-y-0 bg-base-300 mx-auto xl:mx-0">
          <div className="py-5 md:py-10 xl:py-3">
            <div className="space-y-2 lg:space-y-5">
              <h5 className="text-xl md:text-2xl lg:text-4xl xl:text-xl font-semibold text-center">
                Sign up
              </h5>
              <p className="text-xs md:text-base lg:text-xl xl:text-sm text-center">
                Enter your details below to register
              </p>
            </div>
            <div className="">
              <form
                action="#"
                className="flex flex-col px-5 md:px-10 gap-1 lg:gap-2 xl:gap-1 pt-5 md:pt-10"
              >
                <label
                  htmlFor="firstname"
                  className={
                    "pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                  }
                >
                  Firstname
                </label>
                <input
                  type="text"
                  placeholder="Firstname"
                  id="firstname"
                  name="firstname"
                  ref={firstName}
                  required
                  className="p-2 md:p-4 xl:p-2 border border-zinc-500 outline-none rounded-sm mb-3 md:mb-5 focus-within:border-zinc-400 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                />

                <label
                  htmlFor="lastname"
                  className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                >
                  Lastname
                </label>
                <input
                  type="text"
                  placeholder="LastName"
                  id="lastname"
                  name="lastname"
                  ref={lastName}
                  required
                  className="p-2 md:p-4 xl:p-2 border border-zinc-500 outline-none rounded-sm mb-3 md:mb-5 focus-within:border-zinc-400 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                />
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
                  required
                  className="p-2 md:p-4 xl:p-2 border border-zinc-500 outline-none rounded-sm mb-3 md:mb-5 focus-within:border-zinc-400 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                />

                <label
                  htmlFor="password"
                  className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  ref={password}
                  required
                  className="p-2 md:p-4 xl:p-2 border border-zinc-500 outline-none rounded-sm mb-3 md:mb-5 focus-within:border-zinc-400 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                />

                <label
                  htmlFor="dob"
                  className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  ref={dateOfBirth}
                  required
                  className="text-zinc-500 p-2 md:p-4 xl:p-2 border border-zinc-500 outline-none rounded-sm mb-6 focus-within:border-zinc-400 text-[14px] md:text-lg lg:text-2xl xl:text-base"
                />

                <div className="flex justify-center">
                  <button
                    className="px-2 md:px-3 lg:px-5 xl:px-3 py-1 md:py-2 lg:py-3 xl:py-2 text-sm md:text-base lg:text-2xl xl:text-base text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="px-5 md:px-10 py-5 flex justify-between pb-5 ">
              <p className="text-xs md:text-base lg:text-xl xl:text-sm">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-400 underline font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
            
          </div>
        </div>
      </section>
    </section>
  );
};

export default Signup;

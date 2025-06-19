import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {signUpDataValidation} from "@/utils/validation";
import axios from "axios";
import bgImagesignup from "../../assets/match-image-1.webp"

const Signup = () => {
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
        const res = await axios({
          method: "post",
          url: "http://localhost:3000/signup",
          signupData,
        });
      } catch (err) {
        console.log("ERROR: " + err.message);
      }
    }
  };

  return (
    <section data-theme="black" className="w-screen h-[90vh] bg-base-200 grid">
      <section className="relative w-full min-h-full flex items-center overflow-x-hidden">
        {/* Card 2 - behind */}
        <div className="absolute w-[70%] h-[90%] bg-blue-300 rounded-lg shadow-lg z-0 right-0 overflow-hidden">
          <img
            alt="signup-image"
            className="w-full h-full object-cover"
            src={bgImagesignup}
          />
        </div>

        {/* Card 1 - front */}
        <div className="relative w-[30%] h-[85%] rounded-lg shadow-2xl z-10 transform translate-x-30 bg-base-300 py-3">
          <div className="space-y-4">
            <div className="px-10">
              <h5 className="text-xl font-semibold text-center shadow-lg mb-2">
                Sign up
              </h5>
              <p className="text-center italic text-sm">
                Enter your details below to register on <span>DevTinder</span>
              </p>
            </div>
            <div className="">
              <form action="#" className="flex flex-col px-10 gap-1 relative">
                <label htmlFor="firstname" className={"pl-2"}>
                  Firstname
                </label>
                <input
                  type="text"
                  placeholder="Firstname"
                  id="firstname"
                  name="firstname"
                  ref={firstName}
                  required
                  className="px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 focus-within:border-zinc-400"
                />

                <label htmlFor="lastname" className="pl-2">
                  Lastname
                </label>
                <input
                  type="text"
                  placeholder="LastName"
                  id="lastname"
                  name="lastname"
                  ref={lastName}
                  required
                  className="px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 focus-within:border-zinc-400"
                />
                <label htmlFor="email" className="pl-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  ref={email}
                  required
                  className="px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 focus-within:border-zinc-400"
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
                  required
                  className="px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-3 focus-within:border-zinc-400"
                />

                <label htmlFor="dob" className="pl-2">
                  Date of birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  ref={dateOfBirth}
                  required
                  className="text-zinc-500 px-2 py-2 border border-zinc-500 outline-none rounded-sm mb-6 focus-within:border-zinc-400"
                />

                <div className="flex justify-center">
                  <button
                    className="px-3 py-2 text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="px-10 pb-5">
              <p className="text-sm">
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

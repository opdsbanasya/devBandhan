import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpDataValidation } from "@/utils/validation";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useDispatch } from "react-redux";
import bgImagesignup from "../../assets/match-image-1.webp";
import { WordRotate } from "../magicui/word-rotate";
import { Eye, EyeOff } from "lucide-react";
import Alert from "../magicui/alert";

const Signup = () => {
  const navigate = useNavigate();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const dateOfBirth = useRef();
  const [inputType, setInputType] = useState("password");
  const [validationErrors, setValidationErrors] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  console.log(validationErrors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      dateOfBirth: dateOfBirth.current.value,
    };
    const validateData = signUpDataValidation(
      signupData,
      validationErrors,
      setValidationErrors
    );

    const isNoError = Object.keys(validateData).length === 0;
    if (isNoError) {
      try {
        const res = await axios.post(`${BASE_URL}/signup`, signupData);

        setIsAlert(true);
        const timer = setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section data-theme="black" className="w-screen h-[90vh] bg-base-200 grid">
      <section className="relative w-full h-full flex xl:items-center overflow-x-hidden py-5 md:py-10">
        <Alert message={"Redirected to login..."} isAlert={isAlert} setIsAlert={setIsAlert} waitTime={3000} />
        
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
                    "pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base flex justify-between items-center"
                  }
                >
                  <span>Firstname</span>
                  {validationErrors?.firstNameError && (
                    <span className="text-red-500 text-xs md:text-sm ">
                      <WordRotate words={[validationErrors?.firstNameError]} />
                    </span>
                  )}
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
                  className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base flex justify-between items-cente"
                >
                  <span>Lastname</span>
                  {validationErrors?.lastNameError && (
                    <span className="text-red-500 text-xs md:text-sm ">
                      <WordRotate words={[validationErrors?.lastNameError]} />
                    </span>
                  )}
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
                  className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base flex justify-between items-cente"
                >
                  <span>Email</span>
                  {validationErrors?.emailError && (
                    <span className="text-red-500 text-xs md:text-sm ">
                      <WordRotate words={[validationErrors?.emailError]} />
                    </span>
                  )}
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
                  className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base flex justify-between items-cente"
                >
                  <span>Password</span>
                  {validationErrors?.passwordError && (
                    <span className="text-red-500 text-xs md:text-sm ">
                      <WordRotate words={[validationErrors?.passwordError]} />
                    </span>
                  )}
                </label>
                <div className="w-full flex items-center justify-between border border-zinc-500 mb-3 md:mb-5 rounded-sm focus-within:border-zinc-400">
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

                <label
                  htmlFor="dob"
                  className="pl-2 text-[14px] md:text-lg lg:text-2xl xl:text-base flex justify-between items-cente"
                >
                  <span>Date of birth</span>
                  {validationErrors?.dobError && (
                    <span className="text-red-500 text-xs md:text-sm ">
                      <WordRotate words={[validationErrors?.dobError]} />
                    </span>
                  )}
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

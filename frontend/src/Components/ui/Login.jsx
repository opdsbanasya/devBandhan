import React from "react";
import { BorderBeam } from "../magicui/border-beam";
import { Link } from "react-router-dom";

const Login = () => {
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
            src="https://videos.openai.com/vg-assets/assets%2Ftask_01jxjzw2qwft7vp3zf7xz08twa%2F1749762931_img_2.webp?st=2025-06-12T20%3A09%3A33Z&se=2025-06-18T21%3A09%3A33Z&sks=b&skt=2025-06-12T20%3A09%3A33Z&ske=2025-06-18T21%3A09%3A33Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=QMOsAPL6H37Ls%2F1YS6Gk9YBflVI370Wo0NG%2BpCioobw%3D&az=oaivgprodscus"
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
                    className="px-2 py-2 border border-zinc-500 outline-none rounded-sm focus-within:border-zinc-400"
                  />

                  <button
                    className="px-3 py-2 text-red-500 bg-red-100 w-fit mx-auto rounded-md font-semibold cursor-pointer mt-10"
                    onClick={() => setIsContinue(true)}
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

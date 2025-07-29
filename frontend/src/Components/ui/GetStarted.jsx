import Footer from "./Footer";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  },[user]);

  return (
    <div
      data-theme="black"
      className="w-screen bg-gradient-to-br from-blue-800 to-red-800 text-white"
    >
      {/* ----------- HERO SECTION ----------- */}
      <section className="h-[90vh] flex items-center justify-center px-4 ">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-500">DevBandhan</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            A collaborative hub for developers to connect, share, and grow with
            like-minded devs.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all shadow-lg cursor-pointer" onClick={()=> navigate("/signup")}>
            🚀 Get Started
          </button>
        </div>
      </section>

      {/* ----------- FEATURES SECTION ----------- */}
      <section className="py-20 px-6 md:px-20 bg-zinc-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          ✨ Features We Provide
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-zinc-800 p-6 rounded-xl shadow-md hover:shadow-blue-500/20 transition">
            <h3 className="text-xl font-semibold mb-2">💬 Developer Match</h3>
            <p className="text-gray-400">
              Find developers based on skills, interests, and project goals.
            </p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl shadow-md hover:shadow-blue-500/20 transition">
            <h3 className="text-xl font-semibold mb-2">
              🚧 Project Collaboration
            </h3>
            <p className="text-gray-400">
              Create, join, or contribute to open-source and side projects.
            </p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl shadow-md hover:shadow-blue-500/20 transition">
            <h3 className="text-xl font-semibold mb-2">📚 Skill Showcases</h3>
            <p className="text-gray-400">
              Build a portfolio with verified contributions and endorsements.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;

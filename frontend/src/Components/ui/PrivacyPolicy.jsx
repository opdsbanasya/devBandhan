import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-zinc-900 text-gray-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="mb-4">
          This project,{" "}
          <span className="text-yellow-400 font-semibold">DevBandhan</span>, is
          created for educational purposes only. It is not a production-ready
          application and should not be used as a real service.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">
          What Data We Collect
        </h2>
        <p className="mb-4">
          We may collect the following information from users for demonstration
          purposes:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Date of Birth</li>
          <li>Bio</li>
          <li>Profile Photo</li>
          <li>Profession</li>
          <li>Skills</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">
          How We Use Your Data
        </h2>
        <p className="mb-4">
          The data you enter is only used to display your profile within this
          educational project. It is not shared, sold, or used for any
          commercial purposes.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">
          Data Security
        </h2>
        <p className="mb-4">
          Since this project is for learning purposes, we do not guarantee
          secure storage of your data. Please do not enter any sensitive or real
          personal information.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">Contact</h2>
        <p className="mb-4">
          If you have any questions about this policy or the project, feel free
          to reach out via the <Link to="/contact-us" className="text-blue-500 hover:underline">Contact</Link> section.
        </p>

        <p className="text-sm text-gray-400 mt-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

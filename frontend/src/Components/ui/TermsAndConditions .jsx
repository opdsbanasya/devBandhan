import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-zinc-900 text-gray-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Terms & Conditions</h1>
        
        <p className="mb-4">
          Welcome to <span className="text-yellow-400 font-semibold">DevBandhan</span>. This project is built purely for educational purposes and is not intended for production use.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">1. Educational Use Only</h2>
        <p className="mb-4">
          DevBandhan is a learning project. It is meant to showcase development skills and ideas.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">2. User Data</h2>
        <p className="mb-4">
          Any data you enter (like name, email, profession, photo, etc.) is only for display within the app and testing purposes.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">3. No Liability</h2>
        <p className="mb-4">
          Since this is a student or personal project, the developer(s) are not responsible for any issues, losses, or misuse arising from using this platform.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">4. No Warranties</h2>
        <p className="mb-4">
          This app comes with no guarantees of functionality, availability, or accuracy. Features may change or break at any time.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">5. Intellectual Property</h2>
        <p className="mb-4">
          All content, design, and code in this app is original or open-source, used under fair-use for educational demonstration only.
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-2">6. Changes to Terms</h2>
        <p className="mb-4">
          These terms may be updated or edited as the project evolves. Please check back for any changes.
        </p>

        <p className="text-sm text-gray-400 mt-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;

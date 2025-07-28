import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 py-8 px-6 text-center text-gray-400">
        <p className="mb-2">
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-500 font-semibold">DevBandhan</span>. All
          rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Link to="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-white transition">
            Terms
          </Link>
          <Link to="/contact-us" className="hover:text-white transition">
            Contact
          </Link>
        </div>
      </footer>
  );
};

export default Footer;

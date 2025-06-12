import React from "react";
import Navbar from "./ui/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./ui/Footer";

function Body() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;

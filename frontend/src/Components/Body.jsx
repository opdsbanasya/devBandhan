import React, { useEffect } from "react";
import Navbar from "./ui/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./ui/Footer";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/store/userSlice";

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleUserData = async () => {
    try {
      const userData = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      console.log(userData);
      
      dispatch(addUser(userData?.data?.user));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      handleUserData();
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;

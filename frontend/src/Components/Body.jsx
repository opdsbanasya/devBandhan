import React, { useEffect } from "react";
import Navbar from "./ui/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./ui/Footer";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/store/userSlice";
import { addFeedData } from "@/store/userFeedSlice";

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const location = useLocation();

  const handleUserData = async () => {
    try {
      const userData = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(userData?.data?.user));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }

    }
  };
  const handleUserFeed = async () => {
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeedData(feedData?.data?.usersForFeed));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }

    }
  };

  useEffect(() => {
    if (location.pathname === "/signup" || location.pathname === "/verify") {
      return;
    }
    if (!user) {
      handleUserData();
    }
    if (!feed) {
      handleUserFeed();
    }
  }, [location.pathname, user, feed]);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Body;

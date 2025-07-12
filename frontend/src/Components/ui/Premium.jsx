import React, { useEffect, useState } from "react";
import { MagicCard } from "../magicui/magic-card";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { ArrowLeftCircle, Eye, Headphones, ShieldCheckIcon, Sparkles, Star, UserPlus2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const [isPremium, setIsPremium] = useState();
  const navigate = useNavigate();

  const verifyPremium = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/payment/verify`, {
        withCredentials: true,
      });

      setIsPremium(response?.data?.isPremium);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    verifyPremium();
  }, []);

  const handlePayClick = async (membershipType) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/create/order`,
        { membershipType: membershipType },
        {
          withCredentials: true,
        }
      );
      
      const { publicKeyId, amount, currency, notes, orderId, userId } =
        order.data;

      var options = {
        key: publicKeyId,
        amount,
        currency,
        description: "Test Transaction",
        order_id: orderId,
        prefill: {},
        notes,
        theme: {
          color: "#3399cc",
        },
        handler: verifyPremium,
      };

      var rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  return isPremium ? (
    <div
      data-theme="black"
      className="w-screen min-h-[90vh] bg-gradient-to-br from-zinc-900 to-black text-white py-10 flex justify-center items-center px-4"
    >
      <div className="text-center max-w-md flex flex-col items-center gap-4 animate-fade-in">
        <ShieldCheckIcon size={48} className="text-blue-400 drop-shadow-md" />
        <h1 className="text-2xl sm:text-3xl font-bold">
          You’re already a premium user!
        </h1>
        <p className="text-base sm:text-lg text-zinc-300">
          Thanks for supporting us 🙌. You already have access to all premium
          features.
        </p>
        <button
          className="mt-4 px-5 py-2 flex items-center gap-2 bg-blue-400 text-white hover:text-black font-semibold rounded-md hover:bg-blue-300 transition cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ArrowLeftCircle size={20} />
          Back to Dashboard
        </button>
      </div>
    </div>
  ) : (
    <div
      data-theme="black"
      className="w-screen min-h-[90vh] bg-gradient-to-br from-zinc-900 to-black text-white py-10 px-4 flex flex-col lg:flex-row lg:justify-center items-center lg:items-start gap-10 md:gap-12 lg:gap-16"
    >
      {/* Silver Membership */}
      <div className="w-full sm:w-4/5 md:w-1/2 lg:w-1/3 rounded-lg hover:scale-[1.02] transition duration-300">
        <MagicCard className="px-6 py-5 shadow-md">
          <h2 className="text-xl font-bold text-center pb-4 text-slate-100">
            🥈 Silver Membership
          </h2>
          <p className="pb-2 text-base sm:text-lg font-medium text-center text-slate-300">
            Perfect for starting out
          </p>
          <ul className="list-none pl-0 text-sm sm:text-base space-y-3 mt-4">
            <li className="flex items-center gap-2">
              <Sparkles size={18} className="text-blue-400" />
              Unlimited Chat
            </li>
            <li className="flex items-center gap-2">
              <UserPlus2 size={18} className="text-blue-400" />
              Unlimited Connections
            </li>
            <li className="flex items-center gap-2">
              <Eye size={18} className="text-blue-400" />
              Unlimited Profile Views
            </li>
          </ul>
          <div className="flex justify-center">
            <button
              onClick={() => handlePayClick("silver")}
              className="px-5 py-2 bg-white text-black font-semibold rounded-md mt-6 hover:bg-gray-200 transition"
            >
              Buy Silver
            </button>
          </div>
        </MagicCard>
      </div>

      {/* Gold Membership */}
      <div className="w-full sm:w-4/5 md:w-1/2 lg:w-1/3 rounded-lg hover:scale-[1.02] transition duration-300">
        <MagicCard className="px-6 py-5 shadow-md border ">
          <h2 className="text-xl font-bold text-center pb-4 text-yellow-300">
            🥇 Gold Membership
          </h2>
          <p className="pb-2 text-base sm:text-lg font-medium text-center text-yellow-100">
            Unlock all premium features
          </p>
          <ul className="list-none pl-0 text-sm sm:text-base space-y-3 mt-4">
            <li className="flex items-center gap-2">
              <Sparkles size={18} className="text-yellow-400" />
              Everything in Silver
            </li>
            <li className="flex items-center gap-2">
              <Headphones size={18} className="text-yellow-400" />
              Priority Support
            </li>
            <li className="flex items-center gap-2">
              <Star size={18} className="text-yellow-400" />
              Access to Exclusive Features
            </li>
          </ul>
          <div className="flex justify-center">
            <button
              onClick={() => handlePayClick("gold")}
              className="px-5 py-2 bg-yellow-300 text-black font-semibold rounded-md mt-6 hover:bg-yellow-200 transition"
            >
              Buy Gold
            </button>
          </div>
        </MagicCard>
      </div>
    </div>
  );
};

export default Premium;

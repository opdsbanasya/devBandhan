import React from "react";
import { MagicCard } from "../magicui/magic-card";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

const Premium = () => {
  const handlePayClick = async (membershipType) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/create/order`,
        { membershipType: membershipType },
        {
          withCredentials: true,
        }
      );
      console.log(order);

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
      };

      var rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      data-theme="black"
      className="w-screen min-h-[90vh] bg-gradient-to-br from-zinc-900 to-black text-white py-10 flex justify-center gap-32"
    >
      <div className="w-1/3 rounded-lg">
        <MagicCard className="px-10 py-5">
          <h2 className="text-xl font-semibold pb-4 text-center">
            🥈 Silver Membership
          </h2>
          <div className="">
            <p className="pb-2 text-lg">Perks and banefits</p>
            <ul className="px-5">
              <li className="list-disc">Unlimited chat</li>
              <li className="list-disc">Unlimited connections</li>
              <li className="list-disc">Unlimited profile view</li>
            </ul>
            <button
              onClick={() => handlePayClick("silver")}
              className="w-fit px-4 py-2 bg-[#F5F5F5] text-black font-semibold rounded-md mx-auto mt-4 cursor-pointer"
            >
              Buy
            </button>
          </div>
        </MagicCard>
      </div>
      <div className="w-1/3 rounded-lg">
        <MagicCard className="px-10 py-5">
          <h2 className="text-xl font-semibold pb-4 text-center">
            🥇 Gold Membership
          </h2>
          <div className="">
            <p className="pb-2 text-lg">Perks and banefits</p>
            <ul className="px-5">
              <li className="list-disc">Unlimited chat</li>
              <li className="list-disc">Unlimited connections</li>
              <li className="list-disc">Unlimited profile view</li>
            </ul>
            <button
              onClick={() => handlePayClick("gold")}
              className="w-fit px-4 py-2 bg-[#FCEF91] text-black font-semibold rounded-md mx-auto mt-4 cursor-pointer"
            >
              Buy
            </button>
          </div>
        </MagicCard>
      </div>
    </div>
  );
};

export default Premium;

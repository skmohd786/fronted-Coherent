import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsPremium(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleBuyClick = async (membershipType) => {
    try {
      const response = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType },
        { withCredentials: true }
      );

      const { keyId, order } = response.data;

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "DevLinker",
        description: "DevLinker Premium Membership",
        order_id: order.orderId,
        prefill: {
          name: order.notes.firstName + " " + order.notes.lastName,
          email: order.notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
        handler: () => {
          setTimeout(async () => {
            await verifyPremiumUser();
            alert("Payment successful! Please wait while we activate your membership.");
          }, 3000);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Unable to initiate payment. Please try again.");
    }
  };

  return isPremium ? (
    <h1>You're already a premium member!</h1>
  ) : (
    <div className="m-6 p-5">
      <div className="flex w-full gap-5">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="text-3xl font-bold">Silver Membership</h1>
          <ul>
            <li>- Unlimited Chats with connections</li>
            <li>- Send 100 Connection Requests per day</li>
            <li>- Silver Verified Badge</li>
            <li>- Ad-free Experience</li>
            <li>- 2 months validity</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn bg-mist-600 hover:bg-mist-500"
          >
            Buy Silver
          </button>
        </div>

        <div className="divider divider-horizontal">OR</div>

        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="text-3xl font-bold">Gold Membership</h1>
          <ul>
            <li>- Unlimited Chats & voice calling* with connections</li>
            <li>- Send Unlimited Connection Requests per day</li>
            <li>- Gold Verified Badge</li>
            <li>- Ad-free Experience</li>
            <li>- 6 months validity</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn bg-yellow-600 hover:bg-yellow-500"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
import React from "react";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const navigate = useNavigate();

  return (
    <div className="m-6 p-5">
      <p className="mb-6 text-center text-gray-400">
        Premium memberships are currently unavailable.
      </p>
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
        </div>
      </div>
      <button className="btn btn-primary mt-8 block mx-auto" onClick={() => navigate("/")}>Go to Feed</button>
    </div>
  );
};

export default Premium;

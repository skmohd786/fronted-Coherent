import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserToFeed } from "../utils/feedSlice";
import { useCallback, useEffect, useState } from "react";
import UserCard from "./UserCard";
import { DEFAULT_PROFILE_IMAGE, getDefaultProfileImage } from "../utils/constants";
import { Link } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const getFeed = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed",
        { withCredentials: true }
      );
      dispatch(addUserToFeed(res.data));

    } catch (err) {
      setError(err.response?.data?.message || "Unable to load developer recommendations.");
    }
  }, [dispatch]);

  useEffect(() => {
    // The request updates Redux or the error state when the API responds.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getFeed();
  }, [getFeed]);

  if (error) return <p className="text-center text-error my-10">{error}</p>;
  if (!feed) return <p className="text-center my-10">Loading developers...</p>;

  if (feed.length === 0) return <h1 className="text-center my-5 font-bold text-2xl"> No More User Found!</h1>;

  return (
    <div className="my-10">
      {user && (
        <div className="flex items-center justify-center gap-3 mb-8 px-6">
          <img
            src={user.photoURL || getDefaultProfileImage(`${user.firstName}-${user.lastName}`)}
            alt={`${user.firstName} profile`}
            className="w-14 h-14 rounded-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = DEFAULT_PROFILE_IMAGE;
            }}
          />
          <div>
            <p className="text-sm opacity-70">Signed in as</p>
            <Link to="/profile" className="font-bold text-lg link link-primary">
              {user.firstName} {user.lastName}
            </Link>
          </div>
        </div>
      )}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Discover Developers</h1>
        <p className="mt-2">Send a connection request to start collaborating.</p>
      </div>
      <div className="flex justify-center px-6">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;

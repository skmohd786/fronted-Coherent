import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL, DEFAULT_PROFILE_IMAGE, getDefaultProfileImage } from "../utils/constants";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");


    const sendRequest = async (status, _id) => {
        setError("");
        setIsSubmitting(true);
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(_id));

        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || "Action failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    const { _id, firstName, lastName, age, photoURL, gender, about } = user;
    const profileImage = photoURL?.includes("defaultprofileimage")
        ? getDefaultProfileImage(`${firstName}-${lastName}`)
        : photoURL || getDefaultProfileImage(`${firstName}-${lastName}`);

    return (
        <div className="card bg-base-300 w-full max-w-md shadow-sm overflow-hidden mx-auto">
            <figure className="h-80 bg-base-200">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover object-center"
                    onError={(event) => {
                        event.currentTarget.onerror = () => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = DEFAULT_PROFILE_IMAGE;
                        };
                        event.currentTarget.src = getDefaultProfileImage(`${firstName}-${lastName}`);
                    }} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age + " , " + gender}</p>
                <p>{about}</p>
                <Link className="link link-primary font-semibold" to={`/user/${_id}`}>
                    View full profile
                </Link>
                {error && <p className="text-error text-sm">{error}</p>}
                <div className="card-actions justify-center my-5">
                    <button className="btn btn-primary" onClick={() => sendRequest("ignored", _id)} disabled={isSubmitting}>
                        {isSubmitting ? "Working..." : "Skip"}
                    </button>
                    <button className="btn btn-secondary" onClick={() => sendRequest("interested", _id)} disabled={isSubmitting}>
                        {isSubmitting ? "Working..." : "Send connection request"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;
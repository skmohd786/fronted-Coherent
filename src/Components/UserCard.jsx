import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL, DEFAULT_PROFILE_IMAGE } from "../utils/constants";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();


    const sendRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(_id));

        } catch (err) {
            console.error(err);
        }
    };


    const { _id, firstName, lastName, age, photoURL, gender, about } = user;

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={photoURL || DEFAULT_PROFILE_IMAGE}
                    alt="Profile"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = DEFAULT_PROFILE_IMAGE;
                    }} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age + " , " + gender}</p>
                <p>{about}</p>
                <div className="card-actions justify-center my-5">
                    <button className="btn btn-primary" onClick={() => sendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => sendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, DEFAULT_PROFILE_IMAGE, getDefaultProfileImage } from "../utils/constants";

const DeveloperProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [developer, setDeveloper] = useState(null);
  const [error, setError] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/${userId}`, {
          withCredentials: true,
        });
        setDeveloper(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load this profile");
      }
    };

    fetchDeveloper();
  }, [userId]);

  const sendRequest = async () => {
    try {
      await axios.post(`${BASE_URL}/request/send/interested/${userId}`, {}, {
        withCredentials: true,
      });
      setRequestSent(true);
    } catch (err) {
      setError(err.response?.data || "Unable to send connection request");
    }
  };

  if (error) return <p className="text-center text-red-500 my-10">{error}</p>;
  if (!developer) return null;

  const { firstName, lastName, age, gender, about, skills, photoURL } = developer;
  const profileImage = photoURL?.includes("defaultprofileimage")
    ? getDefaultProfileImage(`${firstName}-${lastName}`)
    : photoURL || getDefaultProfileImage(`${firstName}-${lastName}`);

  return (
    <main className="max-w-4xl mx-auto my-10 px-6">
      <div className="card lg:card-side bg-base-300 shadow-sm overflow-hidden">
        <figure className="lg:w-1/2 h-96 bg-base-200">
          <img
            src={profileImage}
            alt={`${firstName} ${lastName}`}
            className="h-full w-full object-cover object-center"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = DEFAULT_PROFILE_IMAGE;
            }}
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-3xl">{firstName} {lastName}</h1>
          <p>{age || "Age not set"} · {gender || "Gender not set"}</p>
          <p className="mt-3">{about || "This developer has not added an introduction yet."}</p>
          {skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill) => <span className="badge badge-outline" key={skill}>{skill}</span>)}
            </div>
          )}
          <div className="card-actions mt-6">
            <button className="btn btn-secondary" onClick={sendRequest} disabled={requestSent}>
              {requestSent ? "Request sent" : "Send connection request"}
            </button>
            <Link className="btn btn-ghost" to="/">Back to developers</Link>
          </div>
        </div>
      </div>
      <button className="btn btn-link mt-4" onClick={() => navigate(-1)}>Return</button>
    </main>
  );
};

export default DeveloperProfile;

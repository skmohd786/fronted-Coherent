import React, { useCallback, useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { addConnections } from "../utils/connectionSlice";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const navigate = useNavigate();
  const isPublicRoute = location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login", { replace: true });
      return;
    }

    if (isPublicRoute) return;

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login", { replace: true });
        }
        console.error(err);
      }
    };

    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    fetchConnections();
  }, [dispatch, isPublicRoute, location.pathname, navigate, user]);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

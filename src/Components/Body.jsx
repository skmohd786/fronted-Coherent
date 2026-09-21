import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { addConnections } from "../utils/connectionSlice";

const Body = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isPublicRoute = location.pathname === "/login" || location.pathname === "/signup";
  const [isAuthChecked, setIsAuthChecked] = useState(isPublicRoute);

  useEffect(() => {
    if (isPublicRoute) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
        setIsAuthChecked(true);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login", { replace: true });
        }
        console.error(err);
        setIsAuthChecked(true);
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
  }, [dispatch, isPublicRoute, location.pathname, navigate]);

  if (!isPublicRoute && !isAuthChecked) return null;

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

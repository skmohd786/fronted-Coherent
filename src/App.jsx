import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Body from "./Components/Body";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import SignUp from "./Components/SignUp";
import PasswordChange from "./Components/PasswordChange";
import Premium from "./Components/Premium";
import Chat from "./Components/Chat";
import DeveloperProfile from "./Components/DeveloperProfile";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="user/:userId" element={<DeveloperProfile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="password" element={<PasswordChange />} />
            <Route path="premium" element={<Premium />} />
            <Route path="chat/:toUserId" element={<Chat />} />
            <Route path="" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/ui/Login";
import Signup from "./Components/ui/Signup";
import Profile from "./Components/ui/Profile";
import Feed from "./Components/ui/Feed";
import GetStarted from "./Components/ui/GetStarted";
import Home from "./Components/ui/Home";
import EditProfile from "./Components/ui/EditProfile";
import Settings from "./Components/ui/Settings";
import Premium from "./Components/ui/Premium";
import OtpVerification from "./Components/ui/OtpVerification";
import Chat from "./Components/ui/Chat";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          {/* Auth and landing */}
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<OtpVerification />} />

          {/* Feed, connection, and request */}
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/connection/:connectionId" element={<Feed />} />
            <Route path="/requests/:requestId" element={<Feed />} />
            <Route path="/chat/:toUserId" element={<Chat />} />
          </Route>
          <Route path="/settings" element={<Settings />} />

          {/*User Related */}
          <Route path="/profile/:userId" element={<Profile />}>
            <Route path="edit" element={<EditProfile />} />
          </Route>

          {/* Upgrade or payment releted */}
          <Route path="/upgrade" element={<Premium />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

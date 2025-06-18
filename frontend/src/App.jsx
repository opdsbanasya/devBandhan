import { Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/ui/Login";
import Signup from "./Components/ui/Signup";
import Profile from "./Components/ui/Profile";
import Feed from "./Components/ui/Feed";
import GetStarted from "./Components/ui/GetStarted";
import Home from "./Components/ui/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          {/* Auth and landing */}
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Feed, connection, and request */}
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/connection/:connectionId" element={<Feed />} />
            <Route path="/requests/:requestId" element={<Feed />} />
          </Route>

          {/*User Related */}
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/edit/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

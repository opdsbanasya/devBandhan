import { Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/ui/Login"
import Signup from "./Components/ui/Signup";
import Profile from "./Components/ui/Profile";
import Feed from "./Components/ui/Feed";
import Home from "./Components/ui/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Home   />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

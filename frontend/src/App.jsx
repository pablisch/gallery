import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  const [userToken, setUserToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState(window.localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Navbar userToken={userToken} setUserToken={setUserToken} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserToken={setUserToken} setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUserToken={setUserToken} setUser={setUser} />} />
        {/* <Route path="/upload-image" element={<UploadImage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App

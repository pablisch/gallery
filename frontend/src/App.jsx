import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ImageUploadPage from "./pages/ImageUploadPage.jsx";

function App() {
  if (!window.localStorage.getItem("user")) {
    window.localStorage.removeItem("token");
  }
  const [userToken, setUserToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState(window.localStorage.getItem("user"));
  const [avatar, setAvatar] = useState(window.localStorage.getItem("avatar"));

  return (
    <BrowserRouter>
      <Navbar userToken={userToken} setUserToken={setUserToken} setUser={setUser} avatar={avatar} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUserToken={setUserToken} setUser={setUser} setAvatar={setAvatar} />} />
        <Route path="/signup" element={<SignupPage setUserToken={setUserToken} setUser={setUser} setAvatar={setAvatar} />} />
        <Route path="/upload" element={<ImageUploadPage user={user} userToken={userToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

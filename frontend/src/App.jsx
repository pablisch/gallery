import Navbar from "./components/Navbar.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {

  return (
    <>
      <Navbar navigate={useNavigate()} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/upload-image" element={<UploadImage />} /> */}
      </Routes>
    </>
  );
}

export default App

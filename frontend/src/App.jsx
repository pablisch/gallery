import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import FeedPage from './pages/FeedPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ImageUploadPage from './pages/ImageUploadPage.jsx';
import SingleImagePage from './pages/SingleImagePage.jsx';
import getImageArrayData from './utils/getImageData.js';

function App() {
  if (!window.localStorage.getItem('user')) {
    window.localStorage.clear();
  }
  const [imageData, setImageData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userToken, setUserToken] = useState(
    window.localStorage.getItem('token')
  );
  const [user, setUser] = useState(window.localStorage.getItem('user'));
  const [avatar, setAvatar] = useState(window.localStorage.getItem('avatar'));
  const [isServerUp, setIsServerUp] = useState(false);

  useEffect(() => {
    document.title = 'Gallery';
    getImageArrayData(setImageData);
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        userToken={userToken}
        setUserToken={setUserToken}
        setUser={setUser}
        avatar={avatar}
      />
      <Routes>
        <Route
          path='/'
          element={
            <FeedPage
              isServerUp={isServerUp}
              setIsServerUp={setIsServerUp}
              setSelectedImage={setSelectedImage}
              imageData={imageData}
            />
          }
        />
        <Route
          path='/:id'
          element={
            <SingleImagePage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setAvatar={setAvatar}
              setUser={setUser}
              setImageData={setImageData}
            />
          }
        />
        <Route
          path='/login'
          element={
            <LoginPage
              setUserToken={setUserToken}
              setUser={setUser}
              setAvatar={setAvatar}
            />
          }
        />
        <Route
          path='/signup'
          element={
            <SignupPage
              setUserToken={setUserToken}
              setUser={setUser}
              setAvatar={setAvatar}
            />
          }
        />
        <Route
          path='/upload'
          element={<ImageUploadPage user={user} userToken={userToken} setImageData={setImageData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

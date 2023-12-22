import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import baseUrl from './utils/baseUrl';
import Navbar from './components/Navbar.jsx';
import FeedPage from './pages/FeedPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ImageUploadPage from './pages/ImageUploadPage.jsx';
import SingleImagePage from './pages/SingleImagePage.jsx';

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
    const fetchImageArrayData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1.0/images`);
        setImageData(response.data);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageArrayData(); // Call the fetchData function when the component mounts
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
        {/* <Route
          path='/images'
          element={
            <FeedPage
              isServerUp={isServerUp}
              setIsServerUp={setIsServerUp}
              setSelectedImage={setSelectedImage}
              imageData={imageData}
            />
          }
        /> */}
        <Route
          path='/:id'
          element={
            <SingleImagePage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setAvatar={setAvatar}
              setUser={setUser}
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
          element={<ImageUploadPage user={user} userToken={userToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

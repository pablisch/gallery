import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import SingleImage from '../components/SingleImage';
import './SingleImagePage.css';
import SingleImageInfo from '../components/SingleImageInfo';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

const SingleImagePage = ({
  selectedImage,
  setSelectedImage,
  setAvatar,
  setUser,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage) {
      const singleImage = JSON.parse(window.localStorage.getItem('image'));
      if (singleImage?._id === id) {
        setSelectedImage(singleImage);
      } else {
        const getSingleImage = async () => {
          try {
            const response = await axios.get(
              `${baseUrl}/api/v1.0/images/${id}`);
            setSelectedImage(response.data);
          } catch (error) {
            console.error('Error fetching single image data:', error);
            if (!window.localStorage.getItem('token')) {
              console.log('😖 no token');
              window.localStorage.clear();
              setUser(null);
              setAvatar(null);
            }
            navigate('/');
          }
        };
        getSingleImage();
      }
    }
  }, [id, selectedImage, setSelectedImage]);

  return (
    <div id='single-image-container'>
      {selectedImage && selectedImage?._id === id && (
        <>
          <SingleImage selectedImage={selectedImage} />
          <SingleImageInfo selectedImage={selectedImage} />
        </>
      )}
    </div>
  );
};

SingleImagePage.propTypes = {
  selectedImage: PropTypes.object,
  setSelectedImage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setAvatar: PropTypes.func.isRequired,
};

export default SingleImagePage;

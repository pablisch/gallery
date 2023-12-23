import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import SingleImage from '../components/SingleImage';
import './SingleImagePage.css';
import SingleImageInfo from '../components/SingleImageInfo';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import Button from '../components/Button';
import CommentBox from '../components/CommentBox';
import AddCommentForm from '../components/AddCommentForm';

const SingleImagePage = ({
  selectedImage,
  setSelectedImage,
  setAvatar,
  setUser,
}) => {
  const [addComment, setAddComment] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, selectedImage, setSelectedImage]);

  return (
    <div id='single-image-container'>
      {selectedImage && selectedImage?._id === id && (
        <>
          <SingleImage selectedImage={selectedImage} />
          <SingleImageInfo selectedImage={selectedImage} />
          {(token && !addComment) && <Button
            id='add-comment-btn'
            aria-label='Add comment'
            onClick={() => setAddComment((prev => !prev))}
            className='btn add-btn'
          >Add a comment</Button>}
          {addComment && <AddCommentForm comments={selectedImage.comments} setAddComment={setAddComment} />}
          {selectedImage?.comments?.length > 0 && <CommentBox comments={selectedImage.comments} />}
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

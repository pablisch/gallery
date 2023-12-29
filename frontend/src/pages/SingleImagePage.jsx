import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import SingleImage from '../components/SingleImage';
import './SingleImagePage.css';
import SingleImageInfo from '../components/SingleImageInfo';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import Button from '../components/Button';
import CommentBox from '../components/CommentBox';
import AddCommentForm from '../components/AddCommentForm';
import getImageData from '../utils/getImageData';

const SingleImagePage = ({
  selectedImage,
  setSelectedImage,
  setAvatar,
  setUser,
  setImageData,
}) => {
  const [addComment, setAddComment] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  const username = window.localStorage.getItem('user');
  let likedByUser = selectedImage?.likes?.includes(username);

  const handleLike = async () => {
    const currentImage = selectedImage;
    likedByUser = !likedByUser;
    console.log('likedByUser:', likedByUser);
    if (likedByUser) {
      currentImage.likes.push(username);
    } else {
      currentImage.likes = currentImage.likes.filter(
        (like) => like !== username
      );
    }
    try {
      const response = await axios.put(
        `${baseUrl}/api/v1.0/images/${id}/likes`,
        {
          likes: currentImage.likes,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      await getImageData(setImageData);
      setSelectedImage(currentImage);
    } catch (error) {
      console.error('Error in handleLike:', error);
    }
  };

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
          <div id="comment-like-buttons-container">
          {(token && !addComment) && <Button
            id='add-comment-btn'
            aria-label='Add comment'
            onClick={() => setAddComment((prev => !prev))}
            className='btn add-btn'
            >Add a comment</Button>}
            <Button
              id='like-btn'

            aria-label='like or unlike'
            onClick={handleLike}
              className='btn like-btn' >
              <div id="like-btn-contents">
                {likedByUser ?
                  <><FaHeart className='hover-icons likes-heart-icon'></FaHeart><p className='like-btn-text'>Unlike</p></> : <><FaRegHeart className='hover-icons likes-heart-icon'></FaRegHeart><p className='like-btn-text'>Like</p></>}
              </div>
            </Button>
          </div>
          {addComment && <AddCommentForm comments={selectedImage.comments} setAddComment={setAddComment} setSelectedImage={setSelectedImage} setImageData={setImageData} />}
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
  setImageData: PropTypes.func.isRequired,
};

export default SingleImagePage;

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
import { add } from 'date-fns';

const SingleImagePage = ({
  imageData,
  selectedImage,
  setSelectedImage,
  setAvatar,
  setUser,
  setImageData,
  setIsSideEffect,
}) => {
  const [addComment, setAddComment] = useState(false);
  const [isAddCommentBtnDisabled, setIsAddCommentBtnDisabled] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  const username = window.localStorage.getItem('user');
  let likedByUser = selectedImage?.likes?.includes(username);
  const ImageDescription = selectedImage?.altText || "Unspecified image";

  useEffect(() => {
    document.title = `Gallery - ${ImageDescription}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCommentBtnClick = () => {
    if (!addComment) {
      setAddComment((prev) => !prev);
      setIsAddCommentBtnDisabled(true);
    }
  };

  const handleLike = async () => {
    // setIsSideEffect(true);
    const currentImage = selectedImage;
    likedByUser = !likedByUser;
    if (likedByUser) {
      setIsSideEffect(true);
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
      console.log('Response from like/unlike operation', response);
      await getImageData(setImageData);
      setSelectedImage(currentImage);
      if (likedByUser) {
        setTimeout(() => {
          setIsSideEffect(false);
        }, 1500);
      }
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
              `${baseUrl}/api/v1.0/images/${id}`
            );
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
    <div id='single-image-page-container'>
      {selectedImage && selectedImage?._id === id && (
        <>
          <SingleImage selectedImage={selectedImage} imageData={imageData} setSelectedImage={setSelectedImage} />
          <SingleImageInfo selectedImage={selectedImage} handleCommentIconClick={handleAddCommentBtnClick} handleLikeIconClick={handleLike} />
          <div id='comment-like-buttons-container'>
            {token && (
              <Button
                id='add-comment-btn'
                aria-label='Add comment'
                onClick={handleAddCommentBtnClick}
                className={`btn add-btn ${addComment ? 'inactive-btn' : ''}`}
                disabled={isAddCommentBtnDisabled}
              >
                Add a comment
              </Button>
            )}
            <Button
              id='like-btn'
              aria-label='like or unlike'
              onClick={handleLike}
              className={`btn like-btn ${likedByUser ? 'unlike-btn' : ''}`}>
              <div id='like-btn-contents'>
                {likedByUser ? (
                  <>
                    <FaHeart className='hover-icons likes-heart-icon'></FaHeart>
                    <p className='like-btn-text'>Unlike</p>
                  </>
                ) : (
                  <>
                    <FaRegHeart className='hover-icons likes-heart-icon'></FaRegHeart>
                    <p className='like-btn-text'>Like</p>
                  </>
                )}
              </div>
            </Button>
          </div>
          {addComment && (
            <AddCommentForm
              comments={selectedImage.comments}
              setAddComment={setAddComment}
              setSelectedImage={setSelectedImage}
              setImageData={setImageData}
              setIsAddCommentBtnDisabled={setIsAddCommentBtnDisabled}
              setIsSideEffect={setIsSideEffect}
            />
          )}
          {selectedImage?.comments?.length > 0 && (
            <CommentBox comments={selectedImage.comments} />
          )}
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
  setIsSideEffect: PropTypes.func.isRequired,
  imageData: PropTypes.array.isRequired,
};

export default SingleImagePage;

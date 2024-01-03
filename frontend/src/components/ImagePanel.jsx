import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoCloseSharp } from 'react-icons/io5';
import { FaRegHeart, FaHeart, FaRegCommentDots } from 'react-icons/fa';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import getImageData from '../utils/getImageData';
import Button from './Button';
import './ImagePanel.css';
import getLetterAvatarColourClass from '../utils/letterAvatarColours';

const ImagePanel = ({ image, setSelectedImage, setImageData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const userId = window.localStorage.getItem('cookie');
  const username = window.localStorage.getItem('user');
  const displayUsername =
    image?.username?.length > 12
      ? `${image.username.slice(0, 9)}...`
      : image.username;
  let avatarLetterClass = '';

  const navigate = useNavigate();

  if (image.userAvatar.length === 1) {
    avatarLetterClass = getLetterAvatarColourClass(image.userAvatar);
  }

  const handleSelect = () => {
    window.localStorage.setItem('image', JSON.stringify(image));
    setSelectedImage(image);
    navigate(`/${image._id}`);
  };

  const handleDeleteWarning = () => {
    setConfirmDelete((prev) => !prev);
  };

  const handleConfirmDelete = async () => {
    const token = window.localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `${baseUrl}/api/v1.0/images/${image._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response from delete operation', response);
      await getImageData(setImageData);
      navigate(`/`);
    } catch (error) {
      console.error('Error in handleConfirmDelete:', error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete((prev) => !prev);
  };

  const handleHover = (hoverState) => {
    setIsHovered(hoverState);
  };

  const handleHoverFunction = {
    onMouseEnter: () => handleHover(true),
    onMouseLeave: () => handleHover(false),
    onTouchStart: () => handleHover(true),
    onTouchEnd: () => handleHover(false),
  };

  const getDisplaySrc = (src) => {
    const srcParts = src.split('/upload/');
    return `${srcParts[0]}/upload/w_400/${srcParts[1]}`;
  };

  return (
    <div className='image-card-container'>
      <img
        id={`image-${image.src}`}
        {...handleHoverFunction}
        onClick={handleSelect}
        src={getDisplaySrc(image.src)}
        alt={image.altText}
        className={isHovered ? 'selected image-card' : 'image-card'}
      />

      {/* EVERYTHING below here may be rendered ONLY when HOVERED OVER */}
      {isHovered && (
        <>
          {/* DELETE ICON when image is OWNED by user AND NOT yet selected */}
          {(userId === image.userId || username === 'pablisch') &&
            !confirmDelete && (
              <div
                {...handleHoverFunction}
                onClick={handleDeleteWarning}
                className='hover-close-container'>
                <div id='close-symbol'>
                  <IoCloseSharp />
                </div>
              </div>
            )}
          {/* CONFIRM or CANCEL DELETE buttons when user owns image and has started the DELETE process */}
          {(userId === image.userId || username === 'pablisch') &&
            confirmDelete && (
              <div
                {...handleHoverFunction}
                className='delete-btn-container'>
                <div id='delete-button-container'>
                  <Button
                    id='delete-image-button'
                    onClick={handleCancelDelete}
                    arialabel='confirm-delete'
                    className='btn'>
                    Keep image
                  </Button>
                  <Button
                    id='delete-image-button'
                    onClick={handleConfirmDelete}
                    arialabel='confirm-delete'
                    className='btn warning-btn margin-top'>
                    Confirm delete
                  </Button>
                </div>
              </div>
            )}
          {/* HOVER INFO SECTION at bottom of image panel */}
          <div
            className={`hover-icon-container ${isHovered ? 'selected' : ''}`}
            {...handleHoverFunction}
            onClick={handleSelect}>
            {/* LEFT SIDE - icon and username */}
            <div className='hover-left'>
              {image.userAvatar && image.userAvatar?.length > 1 ? (
                /* USER AVATAR IMAGE */
                <img
                  className='hover-icon icon avatar-icon'
                  src={image.userAvatar}
                  alt='avatar and settings icon'
                />
              ) : (
                /* USER LETTER as AVATAR */
                <div
                  id='image-post-avatar-container'
                  className={`hover-icon icon avatar-letter-outer-container avatar-letter-container ${avatarLetterClass}`}>
                  <h1>{image.userAvatar}</h1>
                </div>
              )}
              {/* USERNAME */}
              {displayUsername ? (
                <p className='hover-username'>{displayUsername}</p>
              ) : (
                <p></p>
              )}
              {/* RIGHT SIDE - NO. of COMMENTS and LIKES */}
            </div>
            <div className='hover-right'>
              <p>{image.comments.length}</p>
              <FaRegCommentDots className='hover-icons comments-icon' />
              <p>{image.likes.length}</p>
              {image.likes.length > 0 ? <FaHeart className='hover-icons likes-heart-icon' /> : <FaRegHeart className='hover-icons likes-heart-icon' />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

ImagePanel.propTypes = {
  image: PropTypes.object.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
  setImageData: PropTypes.func.isRequired,
};

export default ImagePanel;

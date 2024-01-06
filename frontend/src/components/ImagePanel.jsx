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

const imageWidthParam = '/w_400/';

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

  const srcParts = image.src.split('upload');
  const displaySrc = `${srcParts[0]}upload${imageWidthParam}${srcParts[1]}`;

  const imageIdSuffix = displaySrc.split(imageWidthParam)[1];

  return (
    <div
      id={`image-container${imageIdSuffix}`}
      className='image-card-container'>
      <img
        id={`image${imageIdSuffix}`}
        {...handleHoverFunction}
        onClick={handleSelect}
        src={displaySrc}
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
                id='delete-icon-container'
                className='hover-delete-container'>
                <IoCloseSharp id='delete-icon' />
              </div>
            )}
          {/* CONFIRM or CANCEL DELETE buttons when user owns image and has started the DELETE process */}
          {(userId === image.userId || username === 'pablisch') &&
            confirmDelete && (
              <div {...handleHoverFunction} id='delete-btn-container' className='delete-btn-container'>
                  <Button
                    id='cancel-delete-image-btn'
                    onClick={handleCancelDelete}
                    arialabel='cancel-delete'
                    className='btn'>
                    Keep image
                  </Button>
                  <Button
                    id='confirm-delete-image-btn'
                    onClick={handleConfirmDelete}
                    arialabel='confirm-delete'
                    className='btn warning-btn margin-top'>
                    Confirm delete
                  </Button>
              </div>
            )}
          {/* HOVER INFO SECTION at bottom of image panel */}
          <div
            id='hover-info-container'
            className={`hover-info-container ${isHovered ? 'selected' : ''}`}
            {...handleHoverFunction}
            onClick={handleSelect}>
            {/* LEFT SIDE - icon and username */}
            <div id='hover-info-left-side' className='hover-left'>
              {image.userAvatar && image.userAvatar?.length > 1 ? (
                /* USER AVATAR IMAGE */
                <img
                  id='hover-info-avatar-image'
                  className='hover-icon icon avatar-icon'
                  src={image.userAvatar}
                  alt='avatar and settings icon'
                />
              ) : (
                /* USER LETTER as AVATAR */
                <div
                  id='hover-info-avatar-letter-container'
                  className={`hover-icon icon avatar-letter-outer-container avatar-letter-container ${avatarLetterClass}`}>
                  <h1 id='hover-info-avatar-letter'>{image.userAvatar}</h1>
                </div>
              )}
              {/* USERNAME */}
              {displayUsername ? (
                <p id='hover-info-username' className='hover-username'>
                  {displayUsername}
                </p>
              ) : (
                <p></p>
              )}
              {/* RIGHT SIDE - NO. of COMMENTS and LIKES */}
            </div>
            <div id='hover-info-right-side' className='hover-right'>
              <p id='hover-info-comments-num'>{image.comments.length}</p>
              <FaRegCommentDots
                id='hover-info-comments-icon'
                className='hover-icons comments-icon'
              />
              <p id='hover-info-likes-num'>{image.likes.length}</p>
              {image.likes.length > 0 ? (
                <FaHeart
                  id='hover-info-likes-icon'
                  className='hover-icons likes-heart-icon'
                />
              ) : (
                <FaRegHeart
                  id='hover-info-likes-outline-icon'
                  className='hover-icons likes-heart-icon'
                />
              )}
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

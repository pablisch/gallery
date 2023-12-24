import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import getImageData from '../utils/getImageData';
import Button from './Button';
import './ImagePanel.css';

const ImagePanel = ({ image, setSelectedImage, setImageData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const userId = window.localStorage.getItem('cookie');
  const username = window.localStorage.getItem('user');
  const displayUsername = image?.username?.length > 12 ? `${image.username.slice(0, 9)}...` : image.username;

  const navigate = useNavigate();

  const handleSelect = () => {
    console.log(`You clicked on ${image._id}`);
    console.log(`You clicked on ${JSON.stringify(image)}`);
    window.localStorage.setItem('image', JSON.stringify(image));
    setSelectedImage(image);
    navigate(`/${image._id}`);
    const singleImage = JSON.parse(window.localStorage.getItem('image'));
    console.log('single image stored in local:', singleImage);
  };

  const handleDeleteWarning = () => {
    setConfirmDelete((prev) => !prev);
  };

  const handleConfirmDelete = async () => {
    console.log(`You clicked on delete for ${image._id}`);
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
      console.log(response);
      await getImageData(setImageData);
      navigate(`/`);
    } catch (error) {
      console.error('Error in handleConfirmDelete:', error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete((prev) => !prev);
  };

  const onHoverStart = () => {
    setIsHovered(true);
  };

  const onHoverEnd = () => {
    setIsHovered(false);
  };

  const getDisplaySrc = (src) => {
    const srcParts = src.split('/upload/');
    return `${srcParts[0]}/upload/w_400/${srcParts[1]}`;
  };

  return (
    <div className='image-card-container'>
      <img
        id={`image-${image.src}`}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onTouchStart={onHoverStart}
        onTouchEnd={onHoverEnd}
        onClick={handleSelect}
        src={getDisplaySrc(image.src)}
        alt={image.altText}
        className={isHovered ? 'selected image-card' : 'image-card'}
      />
      {isHovered && (
        <>
          {(userId === image.userId || username === 'pablisch') &&
            !confirmDelete && (
              <div
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                onTouchStart={onHoverStart}
                onTouchEnd={onHoverEnd}
                onClick={handleDeleteWarning}
                className='hover-close-container'>
                <div id='close-symbol'>
                  <IoCloseSharp />
                </div>
              </div>
            )}
          {(userId === image.userId || username === 'pablisch') &&
            confirmDelete && (
              <div
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                onTouchStart={onHoverStart}
                onTouchEnd={onHoverEnd}
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
          <div
            className={`hover-icon-container ${isHovered ? 'selected' : ''}`}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            onTouchStart={onHoverStart}
            onTouchEnd={onHoverEnd}
            onClick={handleSelect}>
            <div className='hover-left'>
              {image.userAvatar && image.userAvatar?.length > 1 ? (
                <img
                  className='hover-icon icon avatar-icon'
                  src={image.userAvatar}
                  alt='avatar and settings icon'
                />
              ) : (
                <div
                  id='image-post-avatar-container'
                  className='hover-icon icon avatar-letter-outer-container avatar-letter-container'>
                  <h1>{image.userAvatar}</h1>
                </div>
              )}
              {displayUsername ? (
                <p className='hover-username'>{displayUsername}</p>
              ) : (
                <p></p>
              )}
            </div>
            {image.comments.length > 0 && <p className="hover-right">{`${image.comments.length} comment${image.comments.length > 1 ? 's' : ''}`}</p>}
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

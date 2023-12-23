import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoCloseSharp } from 'react-icons/io5';
import './ImagePanel.css';

const ImagePanel = ({ image, setSelectedImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const userId = window.localStorage.getItem('cookie');
  console.log(userId, image.userId);

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`You clicked on ${image._id}`);
    console.log(`You clicked on ${JSON.stringify(image)}`);
    window.localStorage.setItem('image', JSON.stringify(image));
    setSelectedImage(image);
    navigate(`/${image._id}`);
    const singleImage = JSON.parse(window.localStorage.getItem('image'));
    console.log('single image stored in local:', singleImage);
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
          onClick={handleClick}
          src={getDisplaySrc(image.src)}
          alt={image.altText}
          className={isHovered ? 'selected image-card' : 'image-card'}
        />
        {isHovered && (
          <>
          <div
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            onTouchStart={onHoverStart}
            onTouchEnd={onHoverEnd}
            className='hover-close-container'>
              {userId === image.userId && (
                <div id='close-symbol'>
                  <IoCloseSharp />
                </div>
              )}
            </div>
            <div
              className={`hover-icon-container ${isHovered ? 'selected' : ''}`}
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
              onTouchStart={onHoverStart}
              onTouchEnd={onHoverEnd}
              onClick={handleClick}>
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
                {image.username ? (
                  <p className='hover-username'>{image.username}</p>
                ) : (
                  <p></p>
                )}
              </div>
          </>
        )}
      </div>

  );
};

ImagePanel.propTypes = {
  image: PropTypes.object.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
};

export default ImagePanel;

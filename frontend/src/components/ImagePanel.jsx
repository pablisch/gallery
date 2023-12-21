import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ImagePanel.css';

const ImagePanel = ({ image, setSelectedImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  // let avatar = null;

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`You clicked on ${image._id}`);
    setSelectedImage(image);
    navigate(`/images/${image._id}`)
  };

  // avatar = image.userAvatar?.length > 1 ?
  //   <img className='hover-icon icon avatar-icon' src={image.userAvatar} alt="avatar and settings icon" /> :
  //   <div id="image-post-avatar-container" className="hover-icon icon avatar-letter-outer-container avatar-letter-container">
  //       <h1 >{image.userAvatar}</h1>
  //   </div>;
  
  const onHoverStart = () => {
      setIsHovered(true);
  }

  const onHoverEnd = () => {
    setIsHovered(false);
  }

  return (
    <div className="image-card-container">
      <img
        id={`image-${image.src}`}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onClick={handleClick}
        src={image.src}
        alt={image.altText}
        className={isHovered ? 'selected image-card' : 'image-card'}
      />
      {isHovered && (
        <div className="hover-icon-container"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          {image.userAvatar && image.userAvatar?.length > 1 ? (
            <img className="hover-icon icon avatar-icon" src={image.userAvatar} alt="avatar and settings icon" />
          ) : (
            <div id="image-post-avatar-container" className="hover-icon icon avatar-letter-outer-container avatar-letter-container">
              <h1>{image.userAvatar}</h1>
            </div>
          )}
          {image.username ? <p className="hover-username">{image.username}</p> : <p></p>}
        </div>
      )}
    </div>
  );
};

ImagePanel.propTypes = {
  image: PropTypes.object.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
}

export default ImagePanel;


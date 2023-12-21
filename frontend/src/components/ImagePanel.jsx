import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ImagePanel.css';

const ImagePanel = ({ image, setSelectedImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`You clicked on ${image._id}`);
    setSelectedImage(image);
    navigate(`/images/${image._id}`)
  };

  return (
    <img
      id={`image-${image.src}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      src={image.src}
      alt={image.altText}
      className={isHovered ? "selected image-card" : "image-card"}
    />
  );
};

ImagePanel.propTypes = {
  image: PropTypes.object.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
}

export default ImagePanel;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ImagePanel.css';

const ImagePanel = ({ image, setSelectedImage }) => {
  const [isSelected, setIsSelected] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`You clicked on ${image._id}`);
    setIsSelected(selected => !selected);
    setSelectedImage(image);
    navigate(`/images/${image._id}`)
  };
  
  return (
    <img
      id={`image-${image.src}`}
      onClick={handleClick}
      src={image.src}
      alt={image.altText}
      className={isSelected ? "selected image-card" : "image-card"}
    />
  );
};

ImagePanel.propTypes = {
  image: PropTypes.object.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
}

export default ImagePanel;


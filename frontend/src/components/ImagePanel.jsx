import { useState } from 'react';
import PropTypes from 'prop-types';
import './ImagePanel.css';

const ImagePanel = ({ image }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    console.log(`You clicked on ${image.src}`);
    setIsSelected(selected => !selected);
    
  };
  
  return (
    <img
      onClick={handleClick}
      src={image.src}
      alt={image.altText}
      className={isSelected ? "selected image-card" : "image-card"}
    />
  );
};

ImagePanel.propTypes = {
  image: PropTypes.object.isRequired
}

export default ImagePanel;


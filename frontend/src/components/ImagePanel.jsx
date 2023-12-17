import { useState } from 'react';
import PropTypes from 'prop-types';
import './ImagePanel.css';

const ImagePanel = ({ src }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    console.log(`You clicked on ${src}`);
    setIsSelected(selected => !selected);
    
  };
  
  return (
    <img
      onClick={handleClick}
      src={src}
      alt="person"
      className={isSelected ? "selected image-card" : "image-card"}
    />
  );
};

ImagePanel.propTypes = {
  src: PropTypes.string.isRequired
}

export default ImagePanel;


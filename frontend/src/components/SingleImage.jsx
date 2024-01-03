import PropTypes from 'prop-types';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';
import { useState } from 'react';
import '../pages/SingleImagePage.css';
import { useNavigate } from 'react-router-dom';

const SingleImage = ({ selectedImage, imageData, setSelectedImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const getCurrentImageIndex = () => {
    // console.log('Image data', imageData);
    // console.log('Selected image', selectedImage)
    const currentImageIndex = imageData.findIndex(
      (image) => image._id === selectedImage._id
    );
    return currentImageIndex;
  };

  // NOTE: Since the images are diaplyed in reverse order, the left arrow displays the next image
  // in the array rather than the previous image.
  const handleLeftArrowClick = () => {
    const currentImageIndex = getCurrentImageIndex();
    const previousImageIndex =
      currentImageIndex === imageData.length - 1 ? 0 : currentImageIndex + 1;
    const previousImageId = imageData[previousImageIndex]._id;
    setSelectedImage(imageData[previousImageIndex]);
    window.localStorage.setItem('image', JSON.stringify(imageData[previousImageIndex]));
    navigate(`/${previousImageId}`);
  };

  const handleRightArrowClick = () => {
    console.log('Right arrow clicked');
    const currentImageIndex = getCurrentImageIndex();
    const nextImageIndex =
      currentImageIndex === 0 ? imageData.length - 1 : currentImageIndex - 1;
    const nextImageId = imageData[nextImageIndex]._id;
    setSelectedImage(imageData[nextImageIndex]);
    window.localStorage.setItem('image', JSON.stringify(imageData[nextImageIndex]));
    navigate(`/${nextImageId}`);
  };

  const hoverHandler = (hoverState) => {
    setIsHovered(hoverState);
  };

  const hoverFunctions = {
    onMouseEnter: () => hoverHandler(true),
    onMouseLeave: () => hoverHandler(false),
    onTouchStart: () => hoverHandler(true),
    onTouchEnd: () => hoverHandler(false),
  };

  return (
    <>
      <div id='single-image-container'>
        <img
          className='single-image'
          src={selectedImage.src}
          alt={selectedImage.altText}
          {...hoverFunctions}
        />
        {isHovered && (
          <>
            <div
              id='left-arrow'
              className='arrow'
              {...hoverFunctions}
              onClick={handleLeftArrowClick}>
              <FaCaretLeft />
            </div>
            <div id='right-arrow' className='arrow' {...hoverFunctions}
            onClick={handleRightArrowClick}>
              <FaCaretRight />
            </div>
          </>
        )}
      </div>
    </>
  );
};

SingleImage.propTypes = {
  selectedImage: PropTypes.object,
  imageData: PropTypes.array,
  setSelectedImage: PropTypes.func,
};

export default SingleImage;

import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const SingleImagePage = ({selectedImage}) => {
  const { id } = useParams();
  // const imageToDisplay = imageData.find(image => image._id === id);
  console.log('id:', id);
  console.log('selected image:', selectedImage);
  
  return (
    <div>
      <img src={selectedImage.src} alt={selectedImage.altText} />
    </div>
  );
};

SingleImagePage.propTypes = {
  selectedImage: PropTypes.object,
  }

export default SingleImagePage

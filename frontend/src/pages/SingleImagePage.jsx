import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import SingleImage from '../components/SingleImage';
import './SingleImagePage.css';
import SingleImageInfo from '../components/SingleImageInfo';

const SingleImagePage = ({selectedImage}) => {
  const { id } = useParams();
  
  return (
    <div id='single-image-container'>
      {selectedImage?._id === id && <>
        <SingleImage selectedImage={selectedImage} />
        <SingleImageInfo selectedImage={selectedImage} />
        </>}
    </div>
  );
};

SingleImagePage.propTypes = {
  selectedImage: PropTypes.object,
  }

export default SingleImagePage

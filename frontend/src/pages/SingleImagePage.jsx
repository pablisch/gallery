import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import SingleImage from '../components/SingleImage';
import './SingleImagePage.css';
import SingleImageInfo from '../components/SingleImageInfo';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

const SingleImagePage = ({selectedImage}) => {
  const { id } = useParams();

  // if (!selectedImage) {
  //   const response = axios.get(`${baseUrl}/api/v1.0/image/${id}`)
  // }
  
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

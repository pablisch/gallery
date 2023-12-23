import axios from 'axios';
import baseUrl from './baseUrl';

const getSingleImageData = async (imageId, setSelectedImage) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1.0/images/${imageId}`);
    setSelectedImage(response.data);
  } catch (error) {
    console.error('Error fetching image data:', error);
  }
};

export default getSingleImageData;
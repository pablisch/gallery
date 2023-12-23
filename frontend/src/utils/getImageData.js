import axios from 'axios';
import baseUrl from './baseUrl';

const getImageArrayData = async (setImageData) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1.0/images`);
    setImageData(response.data);
  } catch (error) {
    console.error('Error fetching image data:', error);
  }
};

export default getImageArrayData;
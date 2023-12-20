import { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import ImagePanel from './ImagePanel';
// import initialImageData from '../utils/initialImageData';
import './Feed.css';
import baseUrl from '../utils/baseUrl';

const columnBreakpoints = {
  default: 5, 
  1500: 4,
  1200: 3,
  900: 2,    
  600: 1,     
};

const Feed = () => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    document.title = 'Gallery';

    // Axios request to fetch image data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1.0/image`); 
        setImageData(response.data); 
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <div className="image-layout">
      <Masonry
        breakpointCols={columnBreakpoints}
        className="masonry-grid"
        columnClassName="masonry-column"
        gutter="200px"
      >
        {imageData.length > 0 && [...imageData].reverse().map((image, index) => (
            <ImagePanel key={image._id} image={image} />
        ))}
      </Masonry>
    </div>
  );
};

export default Feed;

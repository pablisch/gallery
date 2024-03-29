import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import ImagePanel from './ImagePanel';
import './Feed.css';

const columnBreakpoints = {
  default: 5, 
  1500: 4,
  1200: 3,
  900: 2,    
  600: 1,     
};

const Feed = ({imageData, setSelectedImage, setImageData}) => {

  useEffect(() => {
    document.title = 'Gallery';
  }, []);

  return (
    <div className="image-layout">
      <Masonry
        breakpointCols={columnBreakpoints}
        className="masonry-grid"
        columnClassName="masonry-column"
        gutter="200px"
      >
        {imageData.length > 0 && [...imageData].reverse().map((image) => (
            <ImagePanel key={image._id} image={image} setSelectedImage={setSelectedImage} setImageData={setImageData} />
        ))}
      </Masonry>
    </div>
  );
};

Feed.propTypes = {
  imageData: PropTypes.array,
  setImageData: PropTypes.func,
  setSelectedImage: PropTypes.func.isRequired,
};

export default Feed;

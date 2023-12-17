import Masonry from 'react-masonry-css';
import ImagePanel from './ImagePanel';
import initialImageData from '../utils/initialImageData';
import './Feed.css';

const columnBreakpoints = {
  default: 5, 
  1500: 4,
  1200: 3,
  900: 2,    
  600: 1,     
};

const Feed = () => {
  return (
    <div className="image-layout">
      <Masonry
        breakpointCols={columnBreakpoints}
        className="masonry-grid"
        columnClassName="masonry-column"
        gutter="200px"
      >
        {initialImageData.map((item, index) => (
          <div key={item.img} className={`image-card custom-class-${index}`}>
            <ImagePanel src={item.img} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Feed;

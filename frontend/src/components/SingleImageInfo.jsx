import PropTypes from 'prop-types';
import { formatDateOutput } from '../utils/formatDateOutput';

const SingleImageInfo = ({ selectedImage }) => {
  let avatar = null;
  console.log(selectedImage);
  
  const formattedDate = formatDateOutput(selectedImage.createdAt);
  
  console.log(formattedDate); 

  avatar = selectedImage.userAvatar?.length > 1 ?
    <img className='icon avatar-icon' src={selectedImage.userAvatar} alt="avatar and settings icon" /> :
    <div id="image-post-avatar-container" className="icon avatar-letter-outer-container avatar-letter-container">
        <h1 >{selectedImage.userAvatar}</h1>
    </div>;

  return (
    <div id='selected-image-info-container'>
      {selectedImage.userAvatar && avatar}
      <p>Photo uploaded by {selectedImage.username} { formattedDate }</p>
    </div>
  )
}

SingleImageInfo.propTypes = {
  selectedImage: PropTypes.object,
  }

export default SingleImageInfo

import PropTypes from 'prop-types';
import { formatDateOutput } from '../utils/formatDateOutput';
import getLetterAvatarColourClass from '../utils/letterAvatarColours';
import { FaRegCommentDots, FaRegHeart, FaHeart } from "react-icons/fa";

const SingleImageInfo = ({ selectedImage }) => {
  let avatarLetterClass = '';
  let avatar = null;
  console.log(selectedImage);
  
  const formattedDate = formatDateOutput(selectedImage.createdAt);
  
  console.log(formattedDate); 

    if (selectedImage.userAvatar?.length === 1) {
      avatarLetterClass = getLetterAvatarColourClass(selectedImage.userAvatar);
    }
  
  avatar = selectedImage.userAvatar?.length > 1 ?
  <img className='icon avatar-icon' src={selectedImage.userAvatar} alt="avatar and settings icon" /> :
  <div id="image-post-avatar-container" className={`icon avatar-letter-outer-container avatar-letter-container ${avatarLetterClass}`}>
        <h1 className={`${avatarLetterClass}`} >{selectedImage.userAvatar}</h1>
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

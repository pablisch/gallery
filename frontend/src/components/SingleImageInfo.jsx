import PropTypes from 'prop-types';
import { formatDateOutput } from '../utils/formatDateOutput';
import getLetterAvatarColourClass from '../utils/letterAvatarColours';
import { FaRegCommentDots, FaRegHeart, FaHeart } from 'react-icons/fa';

const SingleImageInfo = ({ selectedImage }) => {
  let avatarLetterClass = '';
  let avatar = null;

  const formattedDate = formatDateOutput(selectedImage.createdAt);

  if (selectedImage.userAvatar?.length === 1) {
    avatarLetterClass = getLetterAvatarColourClass(selectedImage.userAvatar);
  }

  avatar =
    selectedImage.userAvatar?.length > 1 ? (
      <img
        className='icon avatar-icon'
        src={selectedImage.userAvatar}
        alt='avatar and settings icon'
      />
    ) : (
      <div
        id='image-post-avatar-container'
        className={`icon avatar-letter-outer-container avatar-letter-container ${avatarLetterClass}`}>
        <h1 className={`icon-letter ${avatarLetterClass}`}>{selectedImage.userAvatar}</h1>
      </div>
    );

  return (
    <div id='selected-image-info-container'>
      <div id='selected-image-user-and-time-info'>
        {selectedImage.userAvatar && avatar}
        <p id='image-info'>
          Photo uploaded by {selectedImage.username} {formattedDate}
        </p>
      </div>
      <div className='hover-right' id='selected-image-comments-likes'>
        <p>{selectedImage.comments.length}</p>
        <FaRegCommentDots className='hover-icons comments-icon' />
        <p>{selectedImage.likes.length}</p>
        {selectedImage.likes.length > 0 ? (
          <FaHeart className='hover-icons likes-heart-icon' />
        ) : (
          <FaRegHeart className='hover-icons likes-heart-icon' />
        )}
      </div>
    </div>
  );
};

SingleImageInfo.propTypes = {
  selectedImage: PropTypes.object,
};

export default SingleImageInfo;

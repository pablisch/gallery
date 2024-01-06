import PropTypes from 'prop-types';
import { formatDateOutput } from '../utils/formatDateOutput';
import getLetterAvatarColourClass from '../utils/letterAvatarColours';
import { FaRegCommentDots, FaRegHeart, FaHeart } from 'react-icons/fa';

const SingleImageInfo = ({ selectedImage, handleCommentIconClick, handleLikeIconClick, token, addCommentFormIsOpen }) => {
  let avatarLetterClass = '';
  let avatar = null;

  const formattedDate = formatDateOutput(selectedImage.createdAt);

  if (selectedImage.userAvatar?.length === 1) {
    avatarLetterClass = getLetterAvatarColourClass(selectedImage.userAvatar);
  }

  avatar =
    selectedImage.userAvatar?.length > 1 ? (
      // User avatar image
      <img
        className='icon avatar-icon'
        src={selectedImage.userAvatar}
        alt='avatar and settings icon'
      />
  ) : (
      // User avatar letter
      <div
        id='image-post-avatar-container'
        className={`icon avatar-letter-outer-container avatar-letter-container ${avatarLetterClass}`}>
        <h1 className={`icon-letter ${avatarLetterClass}`}>
          {selectedImage.userAvatar}
        </h1>
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
      {/* BELOW - COMMENT and LIKES count */}
      <div className='hover-right' id='selected-image-comments-likes'>
        <div className='comments-info-div flex-container'>
          <p>{selectedImage.comments.length}</p>
          <FaRegCommentDots className={`hover-icons comments-icon ${token && !addCommentFormIsOpen ? 'clickable' : ''}`} onClick={handleCommentIconClick} />
        </div>
        <div className='likes-info-div flex-container'>
          <p>{selectedImage.likes.length}</p>
          {selectedImage.likes.length > 0 ? (
            <FaHeart className={`hover-icons likes-heart-icon ${token ? 'clickable' : ''}`} onClick={handleLikeIconClick} />
          ) : (
            <FaRegHeart className={`hover-icons likes-heart-icon ${token ? 'clickable' : ''}`} onClick={handleLikeIconClick}  />
          )}
        </div>
      </div>
    </div>
  );
};

SingleImageInfo.propTypes = {
  selectedImage: PropTypes.object,
  handleCommentIconClick: PropTypes.func,
  handleLikeIconClick: PropTypes.func,
  token: PropTypes.string,
  addCommentFormIsOpen: PropTypes.bool,
};

export default SingleImageInfo;

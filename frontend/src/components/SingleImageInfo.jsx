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
        id='image-owner-avatar-image'
        className='icon avatar-icon'
        src={selectedImage.userAvatar}
        alt='avatar and settings icon'
      />
  ) : (
      // User avatar letter
      <div
        id='image-owner-avatar-letter-container'
        className={`icon avatar-letter-outer-container avatar-letter-container ${avatarLetterClass}`}>
        <h1 id='image-owner-avatar-letter' className={`icon-letter ${avatarLetterClass}`}>
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
        <div id='selected-image-comments' className='comments-info-div flex-container'>
          <p id='selected-image-comments-num'>{selectedImage.comments.length}</p>
          <FaRegCommentDots id='selected-image-comments-icon' className={`hover-icons comments-icon ${token && !addCommentFormIsOpen ? 'clickable' : ''}`} onClick={handleCommentIconClick} />
        </div>
        <div id='selected-image-likes' className='likes-info-div flex-container'>
          <p id='selected-image-likes-num'>{selectedImage.likes.length}</p>
          {selectedImage.likes.length > 0 ? (
            <FaHeart id='selected-image-likes-icon' className={`hover-icons likes-heart-icon ${token ? 'clickable' : ''}`} onClick={handleLikeIconClick} />
          ) : (
            <FaRegHeart id='selected-image-likes-outline-icon' className={`hover-icons likes-heart-icon ${token ? 'clickable' : ''}`} onClick={handleLikeIconClick}  />
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

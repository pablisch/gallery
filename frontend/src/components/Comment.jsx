// import React from 'react'
import PropTypes from 'prop-types'
import getLetterAvatarColourClass from '../utils/letterAvatarColours';

const Comment = ({ comment }) => {
  let avatar = null;
  let avatarLetterClass = '';

  if (comment.userAvatar.length === 1) {
    avatarLetterClass = getLetterAvatarColourClass(comment.userAvatar);
  }

  avatar = comment.userAvatar?.length > 1 ?
    <img className='icon avatar-icon icon-s' src={comment.userAvatar} alt="avatar and settings icon icon-s" /> :
    <div id="image-post-avatar-container" className={`icon icon-s avatar-letter-outer-container avatar-letter-container letter-s ${avatarLetterClass}`}>
        <h1 >{comment.userAvatar}</h1>
    </div>;

  return (
    <div id={`comment-${comment.id}`} className='comment comment-container'>
      {comment.userAvatar && avatar}
      <p className='margin-left' >{comment.comment}</p>
      
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object,
  }

export default Comment

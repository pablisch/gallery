// import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import './Comments.css'

const CommentBox = ({comments}) => {
  return (
    <div id='comment-box' >
      <h3 id='comments-title'>Comments</h3>
      <ul id='comments-list'>
        {[...comments].reverse().map((comment) => {
          return (
            <li key={comment.id} className='comment-list-item'>
              <Comment comment={comment} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

CommentBox.propTypes = {
  comments: PropTypes.array,
}

export default CommentBox

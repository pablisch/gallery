// import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';
import baseUrl from '../utils/baseUrl';
import generateId from '../utils/generateId';

const AddCommentForm = ({ setAddComment }) => {
  const [comment, setComment] = useState('');

  const token = window.localStorage.getItem('token');
  const userId = window.localStorage.getItem('cookie');
  const username = window.localStorage.getItem('user');
  const userAvatar = window.localStorage.getItem('avatar');
  const image = JSON.parse(window.localStorage.getItem('image'));

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${baseUrl}/api/v1.0/images/${image._id}/comments`,
        {
          commentToAdd: {
            id: generateId(),
            comment,
            userId,
            username,
            userAvatar,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response);
      setAddComment(prev => !prev);
    }
    catch (error) {
      console.error('Error in handleAddComment:', error);
    }
  };

  return (
    <div className='form-container'>
      <form id='add-comment-form' className='form'>
        <div className='form-field'>
          <label htmlFor='comment'>Add Comment</label>
          <textarea
            id='comment'
            placeholder='Add comment'
            rows='4'
            cols='50'
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="flex-container">
        <Button id='add-comment-btn' ariaLabel='add-comment-button' onClick={handleAddComment} >
          Add Comment
        </Button>
        <Button id='cancel-add-comment-btn' className='btn cancel-btn left-margin' ariaLabel='cancel-add-comment-button' onClick={() => setAddComment(prev => !prev)} >
          Cancel
        </Button>
        </div>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  user: PropTypes.string,
  setAddComment: PropTypes.func.isRequired,
};

export default AddCommentForm;

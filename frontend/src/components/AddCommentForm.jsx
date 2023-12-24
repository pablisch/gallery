// import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './Button';
import baseUrl from '../utils/baseUrl';
import generateId from '../utils/generateId';
import getSingleImageData from '../utils/getSingleImageData';
import getImageData from '../utils/getImageData';

const AddCommentForm = ({ setAddComment, setSelectedImage, setImageData }) => {
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
    if (!comment) {
      setAddComment((prev) => !prev)
      return;
    }

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
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      await getImageData(setImageData);
      await getSingleImageData(image._id, setSelectedImage);
      setAddComment((prev) => !prev);
    } catch (error) {
      console.error('Error in handleAddComment:', error);
    }
  };

  return (
    <div className='in-page-form-container'>
      <form id='add-comment-form' className='form add-comment-form'>
        <div className='add-comment-field'>
          <label htmlFor='comment'>What would you like to say?</label>
          <textarea
            id='comment'
            placeholder='Add comment'
            rows='4'
            cols='50'
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className='flex-container'>
          <Button
            id='add-comment-btn'
            ariaLabel='add-comment-button'
            onClick={handleAddComment}>
            Add Comment
          </Button>
          <Button
            id='cancel-add-comment-btn'
            className='btn warning-btn left-margin'
            ariaLabel='cancel-add-comment-button'
            onClick={() => setAddComment((prev) => !prev)}>
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
  setSelectedImage: PropTypes.func.isRequired,
  setImageData: PropTypes.func.isRequired,
};

export default AddCommentForm;

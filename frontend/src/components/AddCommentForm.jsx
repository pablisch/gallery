// import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import baseUrl from '../utils/baseUrl';
import generateId from '../utils/generateId';
import getSingleImageData from '../utils/getSingleImageData';
import getImageData from '../utils/getImageData';

const AddCommentForm = ({ setAddCommentFormIsOpen, setSelectedImage, setImageData, setIsAddCommentBtnDisabled, setIsSideEffect }) => {
  const [comment, setComment] = useState('');
  const textareaRef = useRef(null);

  const token = window.localStorage.getItem('token');
  const userId = window.localStorage.getItem('cookie');
  const username = window.localStorage.getItem('user');
  const userAvatar = window.localStorage.getItem('avatar');
  const image = JSON.parse(window.localStorage.getItem('image'));

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    
    if (!comment) {
      setAddCommentFormIsOpen((prev) => !prev)
      return;
    }

    setIsSideEffect(true);

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
      setAddCommentFormIsOpen((prev) => !prev);
      setIsAddCommentBtnDisabled(false);
      setTimeout(() => {
        setIsSideEffect(false);
      }, 1500);
    } catch (error) {
      console.error('Error in handleAddComment:', error);
    }
  };

  const handleCancelAddComment = () => {
    setAddCommentFormIsOpen((prev) => !prev);
    setIsAddCommentBtnDisabled(false);
  }

  return (
    <div className='in-page-form-container'>
      <form id='add-comment-form' className='form add-comment-form'>
        <div id='add-comment-textarea-container' className='add-comment-field'>
          <label id='add-comment-textarea-labelg' htmlFor='comment'>What would you like to say?</label>
          <textarea
            ref={textareaRef}
            id='add-comment-textarea'
            placeholder='Add comment'
            rows='4'
            cols='50'
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div id='add-cancel-comment-btns' className='flex-container'>
          <Button
            id='confirm-add-comment-btn'
            ariaLabel='add-comment-button'
            onClick={handleAddComment}>
            Add Comment
          </Button>
          <Button
            id='cancel-add-comment-btn'
            className='btn warning-btn left-margin'
            ariaLabel='cancel-add-comment-button'
            onClick={handleCancelAddComment}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  user: PropTypes.string,
  setAddCommentFormIsOpen: PropTypes.func.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
  setImageData: PropTypes.func.isRequired,
  setIsAddCommentBtnDisabled: PropTypes.func.isRequired,
  setIsSideEffect: PropTypes.func.isRequired,
};

export default AddCommentForm;

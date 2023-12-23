import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Form.css';
import baseUrl from '../utils/baseUrl';
import getImageArrayData from '../utils/getImageData';

// eslint-disable-next-line no-unused-vars
const ImageUploadForm = ({ user, userToken, setImageData }) => {
  const [imageToUpload, setImageToUpload] = useState(null);
  const [preview, setPreview] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const uploadButtonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gallery Sign Up';
    if (user === null) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, file.type);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const previewFiles = async (file) => {
    const resizedImageBlob = await resizeImage(file, 1000, 1000);

    const reader = new FileReader();
    reader.readAsDataURL(resizedImageBlob);

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    setImageToUpload(resizedImageBlob);
  };

  const handleUploadImage = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append('file', imageToUpload);
      formData.append('upload_preset', 'xwkdy0vz');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/ddinmpzrr/image/upload',
        formData
      );

      const src = response.data.secure_url;
      setPreview(null);
      setImageToUpload(null);

      const imageObject = {
        src,
        altText: '',
        userId: window.localStorage.getItem('cookie'),
        username: user,
        userAvatar: window.localStorage.getItem('avatar'),
        comments: [],
      };

      const dbResponse = await axios.post(
        `${baseUrl}/api/v1.0/images/upload`,
        imageObject,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        }
      );

      console.log(dbResponse);
      console.log('Image uploaded successfully!');
      // setUploadSuccess(true);
      getImageArrayData(setImageData);
      navigate('/');
    } catch (error) {
      console.log(error);
      setImageToUpload(null);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    previewFiles(file);
    uploadButtonRef.current.focus();
  };

  return (
    <>
      <main id='image-upload-form-container' className='form-container'>
        <form
          id='image-upload-form'
          className='form'
          onSubmit={handleUploadImage}>
          <h1 id='image-upload-title' className='form-title'>
            Upload an Image
          </h1>
          <div className='form-field'>
            <button id='image-upload-select' className='btn custom-file-input'>
              <label htmlFor='file-input'>
                Choose file
                <input
                  type='file'
                  id='file-input'
                  onChange={handleFileChange}
                />
              </label>
            </button>
          </div>
          {imageToUpload && <div id='file-name'>{imageToUpload.name}</div>}
          <button
            id='image-upload-submit-button'
            className='btn'
            ref={uploadButtonRef}>
            Upload image
          </button>
          {preview && (
            <div id='image-upload-preview' className='preview'>
              <h4 id='image-upload-preview-title'>Image upload preview</h4>
              <img id='preview-image' src={preview} alt='Preview image' />
            </div>
          )}
        </form>
      </main>
    </>
  );
};

ImageUploadForm.propTypes = {
  user: PropTypes.string,
  userToken: PropTypes.string,
  setImageData: PropTypes.func.isRequired,
};

export default ImageUploadForm;

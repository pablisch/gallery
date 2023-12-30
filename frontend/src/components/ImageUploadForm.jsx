import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Form.css';
import baseUrl from '../utils/baseUrl';
import getImageArrayData from '../utils/getImageData';
import Button from './Button';
import resizeImage from '../utils/resizeImage';

// eslint-disable-next-line no-unused-vars
const ImageUploadForm = ({ user, userToken, setImageData }) => {
  const [imageToUpload, setImageToUpload] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const uploadButtonRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gallery Sign Up';
    if (user === null) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previewFiles = async (file) => {
    setFileName(file.name);
    console.log('file', file)
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

      console.log('Response from upload operation', dbResponse);
      // setUploadSuccess(true);
      getImageArrayData(setImageData);
      navigate('/');
    } catch (error) {
      console.error(error);
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
            <Button id='image-upload-select' className='btn custom-file-input'>
              <label htmlFor='file-input'>
                Choose file
                <input
                  type='file'
                  id='file-input'
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          <Button id='image-upload-submit-btn' ref={uploadButtonRef}>
            Upload image
          </Button>
          {preview && (
            <div id='image-upload-preview' className='preview'>
              <p id='image-upload-preview-title'>{`${fileName} preview`}</p>
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

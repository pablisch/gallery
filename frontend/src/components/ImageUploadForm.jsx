import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Form.css';
import baseUrl from '../utils/baseUrl';
import getImageArrayData from '../utils/getImageData';
import Button from './Button';
import resizeImage from '../utils/resizeImage';
import InputField from './InputField';

const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const ImageUploadForm = ({
  user,
  userToken,
  setImageData,
  setIsSideEffect,
}) => {
  const [imageToUpload, setImageToUpload] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);

  const uploadButtonRef = useRef(null);

  const navigate = useNavigate();

  if (userToken === null) navigate('/');

  useEffect(() => {
    document.title = 'Gallery Image Upload';
    if (user === null) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previewFiles = async (file) => {
    setFileName(file.name);
    console.log('file', file);
    const resizedImageBlob = await resizeImage(file, 1000, 1000);

    const reader = new FileReader();
    reader.readAsDataURL(resizedImageBlob);

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    setImageToUpload(resizedImageBlob);
  };

  const handleUploadImage = async (event) => {
    setIsSideEffect(true);
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append('file', imageToUpload);
      formData.append('upload_preset', uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const src = response.data.secure_url;
      setPreview(null);
      setImageToUpload(null);

      const imageObject = {
        src,
        altText: description,
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
      getImageArrayData(setImageData);
      setDescription('')
      setTimeout(() => {
        setIsSideEffect(false);
      }, 1500);
      console.log("Going to feed")
      navigate('/');
    } catch (error) {
      console.error(error);
      setImageToUpload(null);
    }
  };

  const handleFileChange = (event) => {
    setIsFileSelected(true);
    const file = event.target.files[0];
    previewFiles(file);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  useEffect(() => {
    uploadButtonRef.current.focus();
  }, [isFileSelected]);

  return (
    <>
      <main id='image-upload-form-container' className='form-container'>
        <form
          id='image-upload-form'
          className='form'
          onSubmit={handleUploadImage}
        >
          <h1 id='image-upload-title' className='form-title'>
            Upload an Image
          </h1>
          <Button
            id='image-upload-select-btn'
            className={`btn custom-file-input ${
              isFileSelected ? 'subdued' : ''
              }`}
          >
            <label htmlFor='file-input'>
              {isFileSelected ? 'Change file to upload' : 'Choose file'}
              <input type='file' id='file-input' onChange={handleFileChange} accept='image/*' />
            </label>
          </Button>
          <InputField
            id={'image-upload-description-input'}
            placeholder={'Image description'}
            value={description}
            onChangeFunc={handleDescriptionChange}
          >Image description <span className='information asterisk'>*</span></InputField>
          <Button
            id='image-upload-submit-btn'
            ref={uploadButtonRef}
            disabled={!isFileSelected}
          >
            {isFileSelected ? 'Upload selected image' : 'Upload image'}
          </Button>
          {preview && (
            <div id='image-upload-preview' className='preview'>
              <p id='image-upload-preview-title'>{`${fileName} preview`}</p>
              <img id='preview-image' src={preview} alt='Preview image' />
            </div>
          )}
          <p id='why-description-note' className='information small-info'><span className='asterisk'>*</span> A simple description is important to allow screen readers to provide information about images making the web more widely accessible.</p>
        </form>
      </main>
    </>
  );
};

ImageUploadForm.propTypes = {
  user: PropTypes.string,
  userToken: PropTypes.string,
  setImageData: PropTypes.func.isRequired,
  setIsSideEffect: PropTypes.func.isRequired,
};

export default ImageUploadForm;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Form.css';
import baseUrl from '../utils/baseUrl';

const ImageUploadForm = ({ user, userToken }) => {
  const [imageToUpload, setImageToUpload] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gallery Sign Up';
    if (user === null) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  useEffect(() => {
    if (!imageToUpload) {
      setPreview(null);
      setFileName('');
      return;
    }
    previewFiles(imageToUpload);
    setFileName(imageToUpload.name);
  }, [imageToUpload]);

  const handleUploadImage = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', imageToUpload);
    formData.append('upload_preset', 'xwkdy0vz');
    axios
      .post('https://api.cloudinary.com/v1_1/ddinmpzrr/image/upload', formData)
      .then((response) => {
        console.log(response);
        const src = response.data.secure_url;
        // setImageUrl(src);
        console.log('src', src);
        setPreview(null);
        setImageToUpload(null);
        setFileName('');

        const imageObject = {
          src,
          altText: '',
          userId: window.localStorage.getItem('cookie'),
          username: user
        };
        console.log('imageObject:', imageObject)
        console.log('userToken:', userToken)
        console.log('window token:', window.localStorage.getItem('token'))

        axios.post(`${baseUrl}/api/v1.0/image/upload`, imageObject, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        }).then((dbResponse) => {
          console.log(dbResponse);
          console.log('Image uploaded successfully!')
          setUploadSuccess(true);
          setTimeout(() => {
            setUploadSuccess(false);
            navigate('/');
          }
          , 10000);
        } 
        ).catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
        setImageToUpload(null);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageToUpload(file);
    setFileName(file.name);
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
          <div id='file-name'>{fileName}</div>
          <button id='image-upload-submit-button' className='btn'>
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
};

export default ImageUploadForm;

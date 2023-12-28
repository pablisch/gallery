import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputField from './InputField';
import axios from 'axios';
import './Form.css';
import baseUrl from '../utils/baseUrl';
import Button from './Button';
import resizeImage from '../utils/resizeImage';

const SignupForm = ({ setUserToken, setUser, setAvatar }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageToUpload, setImageToUpload] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gallery Sign Up';
    window.localStorage.clear();
  }, []);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    let avatar = username[0].toUpperCase();

    try {
      if (imageToUpload) {
        const resizedImageBlob = await resizeImage(imageToUpload, 50, 50);
        console.log('uploading image! ImageToUpload:', resizedImageBlob);
        const formData = new FormData();
        formData.append('file', resizedImageBlob);
        formData.append('upload_preset', 'xwkdy0vz');

        const CloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/ddinmpzrr/image/upload',
          formData
        );

        // console.log(response);
        avatar = CloudinaryResponse.data.secure_url;
        setPreview(null);
        setImageToUpload(null);
      }

      const DbResponse = await axios.post(
        `${baseUrl}/api/v1.0/user/signup`,
        {
          name,
          username,
          email,
          password,
          avatar,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (DbResponse.status === 201) {
        const responseData = DbResponse.data;
        window.localStorage.setItem('token', responseData.token);
        window.localStorage.setItem('user', responseData.username);
        window.localStorage.setItem('cookie', responseData.userId);
        window.localStorage.setItem('avatar', responseData.avatar);
        setUserToken(responseData.token);
        setUser(responseData.username);
        setAvatar(avatar);
        clearForm();
        navigate('/');
      } else {
        console.log('Something went wrong in handleSignUpSubmit');
      }
    } catch (error) {
      console.error('Error in handleSignUpSubmit:', error);
    }
  };

  // Input field functions
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageToUpload(file);
    console.log('file', file);
    console.log('file name', file.name);
  };

  const clearForm = () => {
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

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
      return;
    }
    previewFiles(imageToUpload);
  }, [imageToUpload]);

  return (
    <>
      <main id='signup-form-container' className='form-container'>
        <form id='signup-form' className='form' onSubmit={handleSignUpSubmit}>
          <h1 id='signup-title' className='form-title'>
            Create a new Gallery account
          </h1>
          <InputField
            id={'signup-name-input'}
            value={name}
            onChangeFunc={handleNameChange}>
            Name
          </InputField>
          <InputField
            id={'signup-username-input'}
            value={username}
            onChangeFunc={handleUsernameChange}>
            Username
          </InputField>
          <InputField
            id={'signup-email-input'}
            type={'email'}
            value={email}
            onChangeFunc={handleEmailChange}>
            Email
          </InputField>
          <InputField
            id={'signup-password-input'}
            type={'password'}
            value={password}
            onChangeFunc={handlePasswordChange}>
            Password
          </InputField>
          <div className='form-field'>
            <label htmlFor='file-input'>Avatar image</label>
            <Button id='avatar-image-upload-select' className='btn custom-file-input'>
            <label htmlFor='file-input'>
                Choose file
                <input
                  type='file'
                  id='avatar-file-input'
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          </div>
          {imageToUpload && <div id='file-name'>{imageToUpload.name}</div>}
          {preview && (
            <div id='avatar-image-upload-preview' className='preview'>
              <img
                id='avatar-image-preview'
                src={preview}
                alt='Preview image'
              />
            </div>
          )}
          <Button id='signup-submit-button' >Sign Up</Button>
        </form>
      </main>
    </>
  );
};

SignupForm.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setAvatar: PropTypes.func.isRequired,
};

export default SignupForm;

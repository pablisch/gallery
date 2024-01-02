import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputField from './InputField';
import axios from 'axios';
import './Form.css';
import baseUrl from '../utils/baseUrl';
import Button from './Button';
import resizeImage from '../utils/resizeImage';
import { validatePassword, validateEmail, validateUsername } from '../utils/signupValidation';
import ErrorMessage from './ErrorMessage';
import { set } from 'mongoose';

const SignupForm = ({ setUserToken, setUser, setAvatar, setIsSideEffect }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageToUpload, setImageToUpload] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gallery Sign Up';
    window.localStorage.clear();
  }, []);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    let avatar = username[0].toUpperCase();

    if (name === '' || username === '' || email === '' || password === '') {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (!validateUsername(username, setErrorMessage)) return;
    if (!validateEmail(email, setErrorMessage)) return;
    if (!validatePassword(password, setErrorMessage)) return;

    setIsSideEffect(true);

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
        setTimeout(() => {
          setIsSideEffect(false);
        }, 1500);
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

  // Below is a bit of a hack but is the only way that I could prevent autofill from showing the password and username
  // combined with 'type={isPasswordVisible ? 'password' : 'text'}' in the password input field, it sets the type to text
  // until a value is entered and for some reason this prevents autofill from showing the password and username.
  useEffect(() => {
    if (!isPasswordVisible) {
      if (password.length > 0) {
        setIsPasswordVisible(true);
      }
    }
  }, [password]);

  return (
    <>
      <main id='signup-form-container' className='form-container'>
        <form id='signup-form' className='form' onSubmit={handleSignUpSubmit} noValidate >
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
            autoComplete='off'
            onChangeFunc={handleEmailChange}>
            Email
          </InputField>
          <InputField
            id={'signup-password-input'}
            type={isPasswordVisible ? 'password' : 'text'}
            value={password}
            name='devicePassword'
            autoComplete='new-password'
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
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      </main>
    </>
  );
};

SignupForm.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setAvatar: PropTypes.func.isRequired,
  setIsSideEffect: PropTypes.func.isRequired,
};

export default SignupForm;

import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Form.css';
import baseUrl from '../utils/baseUrl';
import Button from './Button';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';

const LoginForm = ({ setUserToken, setUser, setAvatar, setIsSideEffect }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const usernameInputRef = useRef(null);

  useEffect(() => {
    document.title = 'Gallery Login';
    window.localStorage.clear();
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      setErrorMessage('Please fill in all fields');
      console.log('Login error no.1')
      return;
    }
    if (username.length < 3 || username.length > 10) {
      setErrorMessage('Username must be between 3 and 10 characters');
      return;
    }

    setIsSideEffect(true);

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1.0/user/login`,
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data; // Assuming the data is in response.data
        console.log('data', responseData);
        window.localStorage.setItem('token', responseData.token);
        window.localStorage.setItem('user', responseData.username);
        window.localStorage.setItem('cookie', responseData.userId);
        window.localStorage.setItem('avatar', responseData.avatar);
        setUserToken(responseData.token);
        setUser(responseData.username);
        setAvatar(responseData.avatar);
        clearForm();
        setTimeout(() => {
          setIsSideEffect(false);
        }, 1500);
        navigate('/');
      } else {
        setErrorMessage('Something went wrong in the login process.');
        console.log('Something went wrong in handleLoginSubmit');
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        console.log('My error message', error.response.data.message)
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Something went wrong during the login process. Please check your connection and try again.');
      }
      console.error('Error in handleLoginSubmit:', error);
    }
  };

  // Input field functions
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <main id='login-form-container' className='form-container'>
        <form id='login-form' className='form' onSubmit={handleLoginSubmit}>
          <h1 id='login-title' className='form-title'>
            Log in to Gallery
          </h1>
          <InputField
            id={'login-username-input'}
            placeholder={'Username'}
            value={username}
            onChangeFunc={handleUsernameChange}
            ref={usernameInputRef}>
            Username
          </InputField>
          <InputField
            id={'login-password-input'}
            type={'password'}
            placeholder={'Password'}
            value={password}
            onChangeFunc={handlePasswordChange}>
            Password
          </InputField>
          <Button id='login-submit-btn'
          disabled={username && password ? false : true} >Log in</Button>
        </form>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      </main>
    </>
  );
};

LoginForm.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setAvatar: PropTypes.func.isRequired,
  setIsSideEffect: PropTypes.func.isRequired,
};

export default LoginForm;

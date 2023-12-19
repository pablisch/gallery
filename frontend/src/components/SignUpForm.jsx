import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Form.css';
import baseUrl from '../utils/baseUrl';


const SignupForm = ({ setUserToken, setUser }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gallery Sign Up';
    window.localStorage.clear();
  }, []);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/v1.0/user/signup`, {
        name,
        username,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const responseData = response.data;
        console.log('data', responseData);
        window.localStorage.setItem('token', responseData.token);
        window.localStorage.setItem('user', responseData.username);
        window.localStorage.setItem('cookie', responseData.userId);
        setUserToken(responseData.token);
        setUser(responseData.username);
        clearForm();
        navigate('/');
      } else {
        console.log('Something went wrong in handleSignUpSubmit');
      }
    }
    catch (error) {
      console.error('Error in handleSignUpSubmit:', error);
    }
  };

  // Input field functions
  const handleSignupEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSignupPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const clearForm = () => {
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <main id="signup-form-container" className='form-container'>
        <form id='signup-form' className='form' onSubmit={handleSignUpSubmit}>
          <h1 id='signup-title' className='form-title'>Create a new Gallery account</h1>
          <div className='form-field'>
            <label htmlFor='signup-name-input'>Name</label>
            <input
              id='signup-name-input'
              type='text'
              placeholder='Name'
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor='signup-username-input'>Username</label>
            <input
              id='signup-username-input'
              type='text'
              placeholder='Username'
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor='signup-email-input'>Email</label>
            <input
              id='signup-email-input'
              type='email'
              placeholder='Email'
              value={email}
              onChange={handleSignupEmailChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor='signup-password-input'>Password</label>
            <input
              id='signup-password-input'
              type='password'
              placeholder='Password'
              value={password}
              onChange={handleSignupPasswordChange}
            />
          </div>
          <button id='sign-up-submit-button' className='btn'>
            Sign Up
          </button>
        </form>
      </main>
    </>
  );
};

SignupForm.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default SignupForm;

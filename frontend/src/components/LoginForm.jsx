import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SignUpForm.css';
import baseUrl from '../utils/baseUrl';


const LoginForm = ({ setUserToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gallery Login';
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${baseUrl}/api/v1.0/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      console.log('data', responseData);
      window.localStorage.setItem('token', responseData.token);
      window.localStorage.setItem('user', responseData.username);
      setUserToken(responseData.token);
      setUser(responseData.username);
      navigate('/');
    } else {
      console.log('Something went wrong in handleLoginSubmit');
    }
  };

  // Input field functions
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLoginPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
  }

  return (
    <>
      <main id="signup-form-container" className='form-container'>
        <form id='signup-form' className='form' onSubmit={handleLoginSubmit}>
          <h1 id='signup-title'>Log in to Gallery</h1>
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
            <label htmlFor='signup-password-input'>Password</label>
            <input
              id='signup-password-input'
              type='password'
              placeholder='Password'
              value={password}
              onChange={handleLoginPasswordChange}
            />
          </div>
          <button id='login-submit-button' type='submit'>
            Log in
          </button>
        </form>
      </main>
    </>
  );
};

LoginForm.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;

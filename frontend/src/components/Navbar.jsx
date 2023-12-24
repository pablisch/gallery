import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import './Navbar.css';
import NavLink from './NavLink';

const Navbar = ({ userToken, setUserToken, setUser, avatar }) => {
  const [isLogoRotated, setIsLogoRotated] = useState(false);
  const [isScreenLessThan450px, setIsScreenLessThan450px] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenLessThan450px(window.innerWidth < 450);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsLogoRotated(true);
  };

  const handleMouseLeave = () => {
    setIsLogoRotated(false);
  };

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    setUserToken(null);
    setUser(null);
  };

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  const handleAddImage = () => {
    navigate('/upload');
  };

  const randomNumber= () =>  Math.floor((Math.random() * 8) + 1);

  return (
    <nav className='navbar' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleMouseEnter} onTouchEnd={handleMouseLeave} >
      <div className='navbar-container'>
      <Link to='/' className={'navbar-section navbar-logo'}>
          <img
            id='nav-logo'
            src='/images/grinch.png'
            alt='logo'
            className={`navbar-logo-img ${isLogoRotated ? 'rotateCw' : ''}`}
          />
          <h1 id='nav-title-text' className='navbar-logo-text'>
            <span className={`letter${randomNumber()} word1`}>M</span>
            <span className={`letter${randomNumber()} word1`}>e</span>
            <span className={`letter${randomNumber()} word1`}>r</span>
            <span className={`letter${randomNumber()} word1`}>r</span>
            <span className={`letter${randomNumber()} word1`}>y </span>
            <span className={`letter${randomNumber()} word2`}>C</span>
            <span className={`letter${randomNumber()} word2`}>h</span>
            <span className={`letter${randomNumber()} word2`}>r</span>
            <span className={`letter${randomNumber()} word2`}>i</span>
            <span className={`letter${randomNumber()} word2`}>s</span>
            <span className={`letter${randomNumber()} word2`}>t</span>
            <span className={`letter${randomNumber()} word2`}>m</span>
            <span className={`letter${randomNumber()} word2`}>a</span>
            <span className={`letter${randomNumber()} word2`}>s</span>
          </h1>
        </Link>
        <div className='navbar-section navbar-links'>
          {userToken ? (
            <>
              <NavLink
                id='logout-navlink'
                route='/images'
                onClickFunc={handleLogOut}>
                Log out
              </NavLink>
              <NavLink
                id='add-image-navlink'
                className={isScreenLessThan450px ? 'big-plus' : ''}
                route='/upload'
                onClickFunc={handleAddImage}>
                {isScreenLessThan450px ? <FaPlus /> : 'Upload image'}
              </NavLink>
              {avatar?.length > 1 ? (
                <Link
                  id='user-settings-navlink'
                  className={`icon settings-avatar-margin ${isLogoRotated ? 'rotateCcw' : ''}`}
                >
                  <img
                    className='icon avatar-icon'
                    src={avatar}
                    alt='avatar and settings icon'
                  />
                </Link>
              ) : (
                <>
                  <div
                      id='user-settings-navlink'
                      className={`icon avatar-letter-outer-container settings-link settings-avatar-margin ${isLogoRotated ? 'rotateCcw' : ''}`}
                    >
                    <Link className='avatar-letter-container'>
                      <h1>{avatar}</h1>
                    </Link>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <NavLink id='logout-navlink' route='/login'>
                Log in
              </NavLink>
              <NavLink id='logout-navlink' route='/signup'>
                Sign up
                </NavLink>
                
              <Link
                id='settings-navlink'
                  className={`icon settings-avatar-margin ${isLogoRotated ? 'rotateCcw' : ''}`}
                >
                <img
                  className='icon settings-icon'
                  src='/images/gearIcon.png'
                  alt='settings icon'
                />
                </Link>
                
            </>
          )}
        </div>
      </div>
      <div className='divider-line'></div>
    </nav>
  );
};

Navbar.propTypes = {
  userToken: PropTypes.string,
  setUserToken: PropTypes.func,
  user: PropTypes.string,
  setUser: PropTypes.func,
  avatar: PropTypes.string,
};

export default Navbar;

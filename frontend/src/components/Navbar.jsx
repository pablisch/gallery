import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';
import NavLink from './NavLink';

const Navbar = ({ userToken, setUserToken, setUser, avatar }) => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    setUserToken(null);
    setUser(null);
  };

  const handleLogOut = () => {
    logout();
    navigate('/images');
  };

  const handleAddImage = () => {
    navigate('/upload');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-section navbar-logo'>
          <img
            id='nav-logo'
            src='/images/PicturePadLogo.png'
            alt='logo'
            className='navbar-logo-img'
          />
          {/* <img id='nav-title-image' src="images/PicturePadTitle.png" alt="site-title-picture-pad" className="navbar-logo-img" /> */}
          <h1 id='nav-title-text' className='navbar-logo-text'>
            <span className='letter1'>P</span>
            <span className='letter7'>i</span>
            <span className='letter3'>c</span>
            <span className='letter4'>t</span>
            <span className='letter1'>u</span>
            <span className='letter5'>r</span>
            <span className='letter6'>e </span>
            <span className='letter8'>P</span>
            <span className='letter7'>a</span>
            <span className='letter5'>d</span>
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
                route='/upload'
                onClickFunc={handleAddImage}>
                Upload image
              </NavLink>
              {avatar?.length > 1 ? (
                <Link
                  id='user-settings-navlink'
                  className='icon settings-avatar-margin'>
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
                    className='icon avatar-letter-outer-container settings-link settings-avatar-margin'>
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
                className='icon settings-avatar-margin'>
                <img
                  className='icon settings-icon'
                  src='images/gearIcon.png'
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

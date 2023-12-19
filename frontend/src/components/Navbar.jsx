import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';
import NavLink from './NavLink';

const Navbar = ({ userToken, setUserToken, user, setUser }) => {
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
    navigate("/upload");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-section navbar-logo">
          <img src="images/gallery.png" alt="logo" className="navbar-logo-img" />
          <h1 className="navbar-logo-text">Gallery</h1>
        </Link>
        <div className="navbar-section navbar-links">
          {userToken ? 
            <>
              <NavLink id='logout-navlink' route='/' onClickFunc={handleLogOut} >Log out</NavLink>
              <NavLink id='add-image-navlink' route='/upload' onClickFunc={handleAddImage} >Upload image</NavLink>
              <NavLink id='user-navlink' >{user}</NavLink>
              <NavLink id='user-settings-navlink' className='user-settings-icon nav-link' >⚙️</NavLink>
            </> : <>
              <NavLink id='logout-navlink' route='/login' >Log in</NavLink>
              <NavLink id='logout-navlink' route='/signup' >Sign up</NavLink>
              <NavLink id='settings-navlink' className='settings-icon nav-link' >⚙️</NavLink>
          </>}
        </div>
      </div>
      <div className="divider-line"></div>
    </nav>
  )
}

Navbar.propTypes = {
  userToken: PropTypes.string,
  setUserToken: PropTypes.func,
  user: PropTypes.string,
  setUser: PropTypes.func
}

export default Navbar

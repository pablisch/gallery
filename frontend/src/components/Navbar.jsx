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
    navigate('/');
  };

  const handleAddImage = () => {
    navigate("/upload");
  };

  const randomNumber= () =>  Math.floor((Math.random() * 8) + 1);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-section navbar-logo">
          <img id='nav-logo' src="images/PicturePadLogo.png" alt="logo" className="navbar-logo-img" />
          {/* <img id='nav-title-image' src="images/PicturePadTitle.png" alt="site-title-picture-pad" className="navbar-logo-img" /> */}
          <h1 id='nav-title-text' className="navbar-logo-text">
            <span className={`letter${randomNumber()}`}>M</span>
            <span className={`letter${randomNumber()}`}>e</span>
            <span className={`letter${randomNumber()}`}>r</span>
            <span className={`letter${randomNumber()}`}>r</span>
            <span className={`letter${randomNumber()}`}>y</span>
            <span className={`letter${randomNumber()}`}> C</span>
            <span className={`letter${randomNumber()}`}>h</span>
            <span className={`letter${randomNumber()}`}>r</span>
            <span className={`letter${randomNumber()}`}>i</span>
            <span className={`letter${randomNumber()}`}>s</span>
            <span className={`letter${randomNumber()}`}>t</span>
            <span className={`letter${randomNumber()}`}>m</span>
            <span className={`letter${randomNumber()}`}>a</span>
            <span className={`letter${randomNumber()}`}>s</span>
          </h1>
        </Link>
        <div className="navbar-section navbar-links">
          {userToken ?
            <>
              <NavLink id='logout-navlink' route='/' onClickFunc={handleLogOut} >Log out</NavLink>
              <NavLink id='add-image-navlink' route='/upload' onClickFunc={handleAddImage} >Upload image</NavLink>
              {avatar?.length > 1 ?
                <Link id='user-settings-navlink' className='settings-link' ><img className='avatar-icon' src={avatar} alt="avatar and settings icon" /></Link> :
                <>  
                <div id="user-settings-navlink" className="settings-letter-container settings-link">
                  <Link className='avatar-letter-container' ><h1 >{avatar}</h1></Link>
                </div>
                {/* <div id="settings-navlink" className="settings-link">
                  <Link id='settings-navlink' className='settings-icon settings-link' ><h1 className='settings-icon' >{avatar}</h1></Link>
                </div> */}
                  </>
              }
            </> : <>
              <NavLink id='logout-navlink' route='/login' >Log in</NavLink>
              <NavLink id='logout-navlink' route='/signup' >Sign up</NavLink>
              <Link id='settings-navlink' className='settings-icon settings-link' ><img className='settings-icon' src='images/gearIcon.png' alt="settings icon" /></Link>
            </>}
        </div>
      </div>
      <div className="divider-line"></div>
    </nav>
  )
};

Navbar.propTypes = {
  userToken: PropTypes.string,
  setUserToken: PropTypes.func,
  user: PropTypes.string,
  setUser: PropTypes.func,
  avatar: PropTypes.string,
}

export default Navbar

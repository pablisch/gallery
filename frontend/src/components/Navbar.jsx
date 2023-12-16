import Button from './Button';
import './NavBar.css';

const Navbar = ({navigate}) => {
  const token = window.localStorage.getItem("token"); 
  // const token = true;

  const logout = () => {
    window.localStorage.removeItem('token'); 
  };

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  const handleAddImage = () => {
    navigate("/upload-image");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" className="navbar-logo-link">
            <img src="images/logo.png" alt="logo" className="navbar-logo-img" />
          </a>
        </div>
        {!token && <Button ariaLabel='Navigate to Sign Up'
            onClick={() => navigate("/Signup")}
          >Sign Up</Button>}

          {!token && <Button ariaLabel='Navigate to Sign Up'
            onClick={() => navigate("/Login")}
          >Log In</Button>}

          {token && <Button ariaLabel='Log out current user'
            onClick={handleLogOut}
          >Log Out</Button>}

          {token && <Button ariaLabel='Add an image'
            onClick={handleAddImage}
          >Upload Image</Button>}
      </div>
    </nav>
  )
}

export default Navbar

import SignupForm from '../components/SignupForm2';
import PropTypes from "prop-types";

const Signup = ({ setUserToken, setUser, setAvatar }) => {
  window.localStorage.removeItem('token'); 
  window.localStorage.removeItem('user');
  setUserToken(null);
  setUser(null);
  
  return (
    <div>
      <SignupForm setUserToken={setUserToken} setUser={setUser} setAvatar={setAvatar} />
    </div>
  );
};

Signup.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setAvatar: PropTypes.func.isRequired,
};

export default Signup;
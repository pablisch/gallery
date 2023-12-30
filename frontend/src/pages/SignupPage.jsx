import SignupForm from '../components/SignupForm2';
import PropTypes from "prop-types";

const Signup = ({ setUserToken, setUser, setAvatar, setIsSideEffect }) => {
  window.localStorage.removeItem('token'); 
  window.localStorage.removeItem('user');
  setUserToken(null);
  setUser(null);
  
  return (
    <div>
      <SignupForm setUserToken={setUserToken} setUser={setUser} setAvatar={setAvatar} setIsSideEffect={setIsSideEffect} />
    </div>
  );
};

Signup.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setAvatar: PropTypes.func.isRequired,
  setIsSideEffect: PropTypes.func.isRequired,
};

export default Signup;
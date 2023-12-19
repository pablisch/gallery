import SignupForm from '@/components/SignupForm';
import PropTypes from "prop-types";

const Signup = ({ setUserToken, setUser }) => {
  window.localStorage.removeItem('token'); 
  window.localStorage.removeItem('user');
  setUserToken(null);
  setUser(null);
  
  return (
    <div>
      <SignupForm setUserToken={setUserToken} setUser={setUser} />
    </div>
  );
};

Signup.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Signup;
import LoginForm from "../components/LoginForm.jsx";
import PropTypes from "prop-types";

const Login = ({ setUserToken, setUser }) => {
  window.localStorage.removeItem('token'); 
  window.localStorage.removeItem('user');
  setUserToken(null);
  setUser(null);
  
  return (
    <div>
      <LoginForm setUserToken={setUserToken} setUser={setUser} />
    </div>
  )
}

Login.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login
import LoginForm from "../components/LoginForm.jsx";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Login = ({ setUserToken, setUser, setAvatar, setIsSideEffect }) => {
  window.localStorage.removeItem('token'); 
  window.localStorage.removeItem('user');
  setUserToken(null);
  setUser(null);

  useEffect(() => {
    document.title = 'Gallery Login';
  }, []);

  return (
    <div>
      <LoginForm setUserToken={setUserToken} setUser={setUser} setAvatar={setAvatar} setIsSideEffect={setIsSideEffect} />
    </div>
  )
}

Login.propTypes = {
  setUserToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setAvatar: PropTypes.func.isRequired,
  setIsSideEffect: PropTypes.func.isRequired,
};

export default Login

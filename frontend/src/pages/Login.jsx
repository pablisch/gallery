import LoginForm from "../components/LoginForm.jsx";
import PropTypes from "prop-types";

const Login = ({ setUserToken, setUser }) => {
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

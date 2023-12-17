import SignupForm from "../components/SignupForm";
import PropTypes from "prop-types";

const Signup = ({ setUserToken, setUser }) => {
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
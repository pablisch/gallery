import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavLink.css';

const NavLink = ({id, route, onClickFunc, className, children}) => {
  return (
      <Link to={route} id={id} className={`nav-link ${className}`} onClick={onClickFunc}>{children}</Link>
  )
}

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.string,
  id: PropTypes.string.isRequired,
  onClickFunc: PropTypes.func,
  className: PropTypes.string
}

export default NavLink

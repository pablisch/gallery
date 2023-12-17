import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavLink.css';

const NavLink = ({id, route, onClickFunc, className = 'nav-link', children}) => {
  return (
    <div id={id} className={className} onClick={onClickFunc} >
      <Link to={route}>{children}</Link>
    </div>
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

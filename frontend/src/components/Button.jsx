import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  children,
  ariaLabel = 'button',
  className = 'btn',
  onClick, 
  id = ''
}) => {
  
  
  return (
    <button id={id} aria-label={ariaLabel} className={className} onClick={onClick} >
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired
}

export default Button;





import {forwardRef} from 'react'
import PropTypes from 'prop-types';

const InputField = forwardRef(({
  id,
  children,
  type = 'text',
  placeholder = children,
  value,
  onChangeFunc,
  className = 'form-field',
}, ref) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFunc}
        ref={ref}
      />
    </div>
  );
});

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeFunc: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

InputField.displayName = 'InputField';

export default InputField;

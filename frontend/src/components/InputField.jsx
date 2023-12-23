// import React from 'react'
import PropTypes from 'prop-types';

const InputField = ({
  children,
  id,
  type = 'text',
  placeholder = children,
  value,
  onChangeFunc,
  className = 'form-field',
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFunc}
      />
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeFunc: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default InputField;
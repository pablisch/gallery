// import React from 'react'
import PropTypes from 'prop-types';

const InputField = ({
  id,
  type = 'text',
  placeholder,
  value,
  onChangeFunc,
  className = 'form-field',
  children,
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

// import React from 'react'
import PropTypes from 'prop-types'
import './ErrorMessage.css'

const ErrorMessage = ({errorMessage = 'Something went wrong.' , className = ''}) => {


  return (
    <div id="error-message-container">
      <p id="error-message" className={`error-message ${className}`} >{ errorMessage }</p>
    </div>
  )
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
  className: PropTypes.string,
}

export default ErrorMessage
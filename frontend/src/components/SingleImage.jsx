import PropTypes from 'prop-types';

const SingleImage = ({selectedImage}) => {
  return (
      <img className='single-image' src={selectedImage.src} alt={selectedImage.altText} />
  )
}

SingleImage.propTypes = {
  selectedImage: PropTypes.object,
  }

export default SingleImage

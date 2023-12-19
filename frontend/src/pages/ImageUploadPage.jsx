import ImageUploadForm from "../components/ImageUploadForm.jsx";
import PropTypes from 'prop-types';

const ImageUpload = ({ user, userToken }) => {
  return (
    <div>
      <ImageUploadForm user={user} userToken={userToken} />
    </div>
  )
}

ImageUpload.propTypes = {
  user: PropTypes.string,
  userToken: PropTypes.string
};

export default ImageUpload
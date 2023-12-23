import ImageUploadForm from "../components/ImageUploadForm.jsx";
import PropTypes from 'prop-types';

const ImageUpload = ({ user, userToken, setImageData }) => {
  return (
    <div>
      <ImageUploadForm user={user} userToken={userToken} setImageData={setImageData} />
    </div>
  )
}

ImageUpload.propTypes = {
  user: PropTypes.string,
  userToken: PropTypes.string,
  setImageData: PropTypes.func,
};

export default ImageUpload
import ImageUploadForm from "../components/ImageUploadForm.jsx";
import PropTypes from 'prop-types';

const ImageUpload = ({ user, userToken, setImageData, setIsSideEffect }) => {
  return (
    <div>
      <ImageUploadForm user={user} userToken={userToken} setImageData={setImageData} setIsSideEffect={setIsSideEffect} />
    </div>
  )
}

ImageUpload.propTypes = {
  user: PropTypes.string,
  userToken: PropTypes.string,
  setImageData: PropTypes.func,
  setIsSideEffect: PropTypes.func,
};

export default ImageUpload
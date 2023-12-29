import Feed from '../components/Feed';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import baseUrl from '../utils/baseUrl';
import ServerNotice from '../components/ServerNotice';

const expectedServerSpinupTime = 40;

const FeedPage = ({ imageData, isServerUp, setIsServerUp, setSelectedImage, setImageData }) => {
  const [counter, setCounter] = useState(expectedServerSpinupTime);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1.0/health/server`);
        if (response.ok) {
          // console.log('server is up');
          setIsServerUp(true);
        } else {
          setIsServerUp(false);
        }
      } catch (error) {
        setIsServerUp(false);
      }
    };

    // Check server status when component is mounted
    checkServerStatus();

    // Optionally, you can set up an interval to periodically check the server status
    const intervalId = setInterval(() => {
      checkServerStatus(); // check server status every x seconds
      setCounter((prevCounter) => prevCounter - 1);
      // console.log(isServerUp, 'still checking');
    }, 1000);

    if (isServerUp) {
      clearInterval(intervalId);
      // console.log('stop checking');
    }

    return () => clearInterval(intervalId); // Clear interval when component unmounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isServerUp]);

  return (
    <>
      {isServerUp ? (
        <Feed imageData={imageData} setSelectedImage={setSelectedImage} setImageData={setImageData} />
      ) : (
        <ServerNotice counter={counter} target={expectedServerSpinupTime} />
      )}
    </>
  );
};

FeedPage.propTypes = {
  isServerUp: PropTypes.bool.isRequired,
  setIsServerUp: PropTypes.func.isRequired,
  imageData: PropTypes.array,
  setSelectedImage: PropTypes.func.isRequired,
  setImageData: PropTypes.func.isRequired,
};

export default FeedPage;

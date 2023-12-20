import PropTypes from 'prop-types';
import './ServerNotice.css';

const ServerNotice = ({target, counter}) => {

  

  return (
    <div>
      {counter < (target - 2) && (<div className='login-form notice'>
        {counter >= 0 ? 
          <p id='server-coutdown'>The server is expected to be up in around {counter <= 0 ? 0 : counter} seconds.</p> :
          <p id='server-coutdown'>Currently waiting for server to spin up for {target - counter} seconds</p>
        }
        <p>This App is currently deployed on a free tier of Render.com which is great but means the server spins down after 15 minutes of inactivity.</p>
        <p>Please be patient while the server spins back up which is likely to take between 40 seconds and around 2 minutes.</p>
        <p>Feel free to browse another tab while this is happening.</p>
      </div>)}
    </div>
  )
}

ServerNotice.propTypes = {
  target: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired,
};

export default ServerNotice

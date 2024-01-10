/* eslint-disable no-undef */
export default process.env.NODE_ENV === 'deploy'
  ? 'https://gallery-backend-n3lo.onrender.com'
  : 'http://localhost:8081';
// export default process.env.NODE_ENV === 'deploy' ? 'https://xmas-gallery.onrender.com' : 'http://localhost:8081';


const hoursElapsedSinceCutOff = 6;

const formatDateString = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleString('en', options);
    return `on ${formattedDate}`;
};

const formatTimeSinceUpload = (dateString) => {
  const startDate = new Date(dateString);
  const currentDate = new Date();

  const elapsedMilliseconds = currentDate - startDate;
  const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));

  const minutes = elapsedMinutes % 60;
  const hours = Math.floor(elapsedMinutes / 60);

  if (elapsedMinutes < 1) {
    return 'just now';
  } else if (hours === 0) {
    return `around ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (minutes === 0) {
    return `around ${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return `around ${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
};
  
const isRecentUpload = (dateString) => {
  const startDate = new Date(dateString);
  const currentDate = new Date();

  const elapsedMilliseconds = currentDate - startDate;
  const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60);

  return elapsedHours <= hoursElapsedSinceCutOff;
};

export const formatDateOutput = (dateString) => {
  if (isRecentUpload(dateString)) {
    return formatTimeSinceUpload(dateString);
  } else {
    return formatDateString(dateString);
  }
}

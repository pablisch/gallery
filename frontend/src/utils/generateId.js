const generateId = () => {
  // current time in milliseconds
  const timestamp = (new Date()).getTime();
  // random number between 0 and 9999
  const randomNumber = Math.floor(Math.random() * 100);
  return([timestamp, randomNumber].join('-'));
};

export default generateId;
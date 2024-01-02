const usernameRegex = /^[a-zA-Z0-9]{3,12}$/; // Regex for alphanumeric characters betweeen 3 and 12 characters
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!?\S]{8,}$/; // Regex for password with at least 8 characters, 1 uppercase, 1 lowercase, and 1 number, and may contain ! and ? characters
const symbolRegex = /^.*[^a-zA-Z0-9?!].*$/; // Regex for symbols excluding ! and ? characters
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/; // Regex for email

export const validateUsername = (username, setErrorMessage) => {
  if (username.length < 3 || username.length > 12) {
    setErrorMessage('Username must be between 3 and 12 characters');
    return false;
  }
  if (!usernameRegex.test(username)) {
    setErrorMessage('Username must be alphanumeric');
    return false;
  }
  setErrorMessage('');
  return true;
}

export const validateEmail = (email, setErrorMessage) => {
  if (!emailRegex.test(email)) {
    setErrorMessage('Please enter a valid email');
    return false;
  }
  setErrorMessage('');
  return true;
}

export const validatePassword = (password, setErrorMessage) => {
  if (symbolRegex.test(password)) {
    setErrorMessage('Password may not contain symbols except ! and ?');
    return false;
  }
  if (!passwordRegex.test(password)) {
    setErrorMessage('Password must be at least 8 characters, 1 uppercase, 1 lowercase, and 1 number');
    return false;
  }
  setErrorMessage('');
  return true;
}
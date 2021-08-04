const invalidFieldError = (message) => ({ error: { name: 'invalidField', message } });

const displayNameValidation = (displayName) => {
  if (!displayName || displayName.length < 8) {
    const message = '"displayName" length must be at least 8 characters long';
    return { error: { name: 'invalidField', message } };
  }
};
const passwordValidation = (password) => {
  if (!password) return invalidFieldError('"password" is required');
  if (password.length < 6) return invalidFieldError('"password" length must be 6 characters long');
};

const emailValidation = (email) => {
  if (!email) return invalidFieldError('"email" is required');
  const reg = /\S+@\S+\.\S+/;
  if (!reg.test(email)) return invalidFieldError('"email" must be a valid email');
};

const newUserValidation = ({ displayName, email, password, image }) => {
  console.log('Seviço');
  const nameNotValid = displayNameValidation(displayName);
  const emailNotValid = emailValidation(email);
  const passwordNotValid = passwordValidation(password);
  console.log(passwordNotValid);

  if (nameNotValid) return nameNotValid;
  if (emailNotValid) return emailNotValid;
  if (passwordNotValid) return passwordNotValid;
  return {};
};

const addUser = (newUserData) => {
  const newUserValidationResponse = newUserValidation(newUserData);
  if (newUserValidationResponse.error) return newUserValidationResponse;
};

module.exports = {
  addUser,
};
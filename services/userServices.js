const isDisplayNameValid = (displayName) => displayName.length > 7;

const isEmailValid = (email) => {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
};

const newUserValidation = ({ displayName, email, password, image }) => {
  console.log('Seviço');
  console.log(isDisplayNameValid(displayName));
  if (!isDisplayNameValid(displayName)) {
    const message = '"displayName" length must be at least 8 characters long';
    return { error: { name: 'invalidField', message } };
  }
  if (!isEmailValid(email)) {
    return { error: { name: 'invalidField', message: '"email" must be a valid email' } };
  }
  return {};
};

const addUser = (newUserData) => {
  const newUserValidationResponse = newUserValidation(newUserData);
  if (newUserValidationResponse.error) return newUserValidationResponse;
};

module.exports = {
  addUser,
};
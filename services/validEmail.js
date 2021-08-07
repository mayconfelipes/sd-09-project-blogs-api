function validEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  if (email === '') return '"email" is not allowed to be empty';
  if (!email) return '"email" is required';
  if (!regex.test(email)) return '"email" must be a valid email';
  return true;
}

module.exports = validEmail;

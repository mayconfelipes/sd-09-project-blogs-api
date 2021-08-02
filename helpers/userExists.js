const userExists = (email) => {
  console.log(email);
  return {
    status: 200,
    message: 'validated',
  };
};

module.exports = userExists;

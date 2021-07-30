const { BAD_REQUEST } = require('../../utils/httpStatus');

const isValidName = (name) => {
  if (!name) {
    const error = { 
      type: BAD_REQUEST,
      message: '"name" is required',
    };
    throw error;
  }
  return true;
};

module.exports = {
  isValidName,
};
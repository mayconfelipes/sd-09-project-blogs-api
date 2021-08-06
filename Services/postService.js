const Schema = require('../Utils/schemas');
const ValidateError = require('../Utils/validateError');

const addPost = (postData) => {
  const { error } = Schema.post.validate(postData);
  if (error) throw new ValidateError(401, error.message);
  return true;
};

module.exports = { addPost };
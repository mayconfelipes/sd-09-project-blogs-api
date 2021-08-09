const Schema = require('../Utils/schemas');
const ValidateError = require('../Utils/validateError');
const { BlogPost } = require('../models');

const addPost = async (postData) => {
  const { body, user: { dataValues } } = postData;
  const { error } = Schema.post.validate(body);
  if (error) throw new ValidateError(401, error.message);
  console.log(dataValues);

  delete dataValues.password;

  const listPost = await BlogPost.create({ ...body, userId: dataValues });
  return listPost;
};

module.exports = { addPost };
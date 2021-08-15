const { BlogPost } = require('../models');
const { schema, validateError } = require('./schemas/postSchema');
const { badRequest } = require('../helpers/getHttpStatusCode');

const createPost = async (postData) => {
  const { userId: _, ...data } = postData;

  const { error } = schema.validate(data);
  if (error) throw validateError(badRequest, error.message);

  const newPost = await BlogPost.create(postData);

  const { updated, published, ...createdPost } = newPost.dataValues;
  console.log('[newPost] >', createdPost);
  return createdPost;
};

module.exports = { createPost };

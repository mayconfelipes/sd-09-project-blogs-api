const { Category, BlogPost, User } = require('../../models');

const invalidFieldError = (message) => ({ error: { name: 'invalidField', message } });

const noEmptyValidation = (valuesObj, fields) => {
  const response = { error: false };
  fields.forEach((field) => {
    if (valuesObj[field] === undefined) {
      response.error = { name: 'invalidField', message: `"${field}" is required` };
    }
  });
  return response;
};

const displayNameValidation = (displayName) => {
  if (!displayName || displayName.length < 8) {
    const message = '"displayName" length must be at least 8 characters long';
    return { error: { name: 'invalidField', message } };
  }
  return { error: false };
};
const passwordValidation = (password) => {
  if (password === '') return invalidFieldError('"password" is not allowed to be empty');
  if (!password) return invalidFieldError('"password" is required');
  if (password.length < 6) return invalidFieldError('"password" length must be 6 characters long');
  return { error: false };
};

const emailValidation = (email) => {
  if (email === undefined) return invalidFieldError('"email" is required');
  if (email === '') return invalidFieldError('"email" is not allowed to be empty');
  const reg = /\S+@\S+\.\S+/;
  if (!reg.test(email)) return invalidFieldError('"email" must be a valid email');
  return { error: false };
};

const categoryEmpty = (categoryIds) => {
  if (categoryIds) {
    return { error: { name: 'invalidField', message: 'Categories cannot be edited' } };
  }
  return { error: false };
};

const isUserWhoPosted = async (userId, postId) => {
  const { dataValues } = await BlogPost.findOne({ 
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    fields: ['userId'],
  });

  if (dataValues.userId !== userId) {
    return { error: { name: 'Unauthorized', message: 'Unauthorized user' } };
  }
  
  return { error: false };
};

module.exports = {
  displayNameValidation,
  passwordValidation,
  emailValidation,
  noEmptyValidation,
  categoryEmpty,
  isUserWhoPosted,
};

const { BlogPost, User, Category } = require('../models');

const verifyCategory = (data) => {
  const dataKeys = Object.keys(data);
  if (dataKeys.includes('categoryIds')) {
    return {
      error: {
        code: 400,
        message: 'Categories cannot be edited',
      },
    };
  }
};

const verifyUser = async (data, id, postId) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  const { userId, categories } = post;
  if (userId !== id) {
  return {
      error: {
        code: 401,
        message: 'Unauthorized user',
      },
    }; 
  }
  return { id: Number(postId), ...data, userId, categories };
};

const verifyData = ({ title, content }) => {
  if (!title) {
    return {
      error: {
        code: 400,
        message: '"title" is required',
      },
    };
  }
  if (!content) {
    return {
      error: {
        code: 400,
        message: '"content" is required',
      },
    };
  }
};

const updateValidator = async (data, userId, postId) => {
  const dataValidation = verifyData(data);
  const categoryValidation = verifyCategory(data);
  const userValidation = verifyUser(data, userId, postId);
  if (dataValidation) return dataValidation;
  if (categoryValidation) return categoryValidation;
  if (userValidation.error) return userValidation;
  return userValidation;
};

module.exports = updateValidator;
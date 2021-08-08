const jwt = require('jsonwebtoken');
const { Category } = require('../models');

const privateKey = 'qualquercoisaaleatoria';

const MISSING_TITLE = {
  status: 400,
  error: {
    message: '"title" is required',
  },
};

const MISSING_CONTENT = {
  status: 400,
  error: {
    message: '"content" is required',
  },
};

const MISSING_CATEGORYIDS = {
  status: 400,
  error: {
    message: '"categoryIds" is required',
  },
};

const CATEGORY_NOT_FOUND = {
  status: 400,
  error: {
    message: '"categoryIds" not found',
  },
};

const INVALID_TOKEN = {
  status: 401,
  error: {
    message: 'Expired or invalid token',
  },
};

const MISSING_AUTH = {
  status: 401,
  error: {
    message: 'Token not found',
  },
};

function validateTitle(title) {
  if (!title) throw MISSING_TITLE;
}

function validateContent(content) {
  if (!content) throw MISSING_CONTENT;
}

async function validateCategoryIds(categoryIds) {
  console.log(categoryIds);
  if (!categoryIds) throw MISSING_CATEGORYIDS;
  const response = await Category.findAll();
  const categoryList = response.map((category) => {
    const { dataValues } = category;
    return dataValues.id;
  });
  const containsCategories = categoryIds.every((Id) => categoryList.includes(Id));
  if (!containsCategories) throw CATEGORY_NOT_FOUND;
}

function validateToken(token) {
  if (!token) throw MISSING_AUTH;
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (err) {
    throw INVALID_TOKEN;
  }
}

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryIds,
  validateToken,
};

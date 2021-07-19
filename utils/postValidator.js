const { Category } = require('../models');

const verifyTitle = (title) => {
  if (!title) {
    return {
      error: {
        code: 400,
        message: '"title" is required',
      },
   };
  }
};

const verifyContent = (content) => {
  if (!content) { 
    return {
      error: {
        code: 400,
        message: '"content" is required',
      },
    };
  }
};

const verifyCategoryIds = (categoryIds) => {
  if (!categoryIds) {
    return {
      error: {
        code: 400,
        message: '"categoryIds" is required' },
    };
  }
};

const verifyCategoryExist = async (categoryIds) => {
  const categories = await Category.findAll();
  const categoriesFromDB = JSON.parse(JSON.stringify(categories));
  const categoriesVerify = categoryIds.map((id) => categoriesFromDB.some((item) => item.id === id));
  const result = categoriesVerify.every((item) => item === true);
  if (result === false) {
    return {
      error: {
        code: 400,
        message: '"categoryIds" not found',
      },
    };
  }
};

const postValidator = async ({ title, content, categoryIds }) => {
  const titleValidation = verifyTitle(title);
  if (titleValidation) return titleValidation;

  const contentValidation = verifyContent(content);
  if (contentValidation) return contentValidation;

  const categoryIdsValidation = verifyCategoryIds(categoryIds);
  if (categoryIdsValidation) return categoryIdsValidation;

  const categoryValidation = await verifyCategoryExist(categoryIds);
  if (categoryValidation) return categoryValidation;
};

module.exports = postValidator;
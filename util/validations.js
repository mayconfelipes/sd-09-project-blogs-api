const { allCategories } = require('../routes/category/categoryModel');
const errorsMessages = require('./errorsMessages');

const validateNewUserDisplayName = (displayName) => {
  if (displayName.length < 8) throw errorsMessages.displayNameError;
};

const validateEmailRequired = (email) => {
  if (!email) throw errorsMessages.emailRequiredError;
};

const validateEmailEmpty = (email) => {
  if (email === '') throw errorsMessages.emailEmptyError;
};

const validateNewUserEmail = (email) => {
  validateEmailRequired(email);
  const isEmailValid = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);
  if (!isEmailValid) throw errorsMessages.emailNotValidError;
};

const validatePasswordRequired = (password) => {
  if (!password) throw errorsMessages.passwordRequiredError;
};

const validatePasswordEmpty = (password) => {
  if (password === '') throw errorsMessages.passwordEmptyError;
};

const validateNewUserPassword = (password) => {
  validatePasswordRequired(password);
  if (password.length < 6) throw errorsMessages.passwordLengthError;
};

const validateNewUser = (user) => {
  const { displayName, email, password } = user;
  validateNewUserDisplayName(displayName);
  validateNewUserEmail(email);
  validateNewUserPassword(password);
};

const validateLogin = (user) => {
  const { email, password } = user;
  validateEmailEmpty(email);
  validateEmailRequired(email);
  validatePasswordEmpty(password);
  validatePasswordRequired(password);
};

const validateNewCategory = (category) => {
  if (!category.name) throw errorsMessages.categoryNameRequired;
};

const validateTitleRequired = (title) => {
  if (!title) throw errorsMessages.postTitleRequired;
};

const validateContentRequired = (content) => {
  if (!content) throw errorsMessages.postContentRequired;
};

const validateCategoryIdsRequired = (categoryIds) => {
  if (!categoryIds) throw errorsMessages.postCategoryIdRequired;
};

const validateNewBlogPost = (blogPost) => {
  validateTitleRequired(blogPost.title);
  validateContentRequired(blogPost.content);
  validateCategoryIdsRequired(blogPost.categoryIds);
};

const validateCategoryIds = async (postCategoryIds) => {
  const categories = await allCategories();
  const idFound = postCategoryIds.every((catId) => categories.some(({ id }) => id === catId));
  if (!idFound) throw errorsMessages.categoryNotFound;
};

const validateNotUpdateCategoryIds = (categoryIds) => {
  if (categoryIds) throw errorsMessages.categoryCannotUpdate;
};

const validatePostUpdate = (postToUpdate) => {
  validateTitleRequired(postToUpdate.title);
  validateContentRequired(postToUpdate.content);
  validateNotUpdateCategoryIds(postToUpdate.categoryIds);
};

module.exports = {
  validateNewUser,
  validateLogin,
  validateNewCategory,
  validateNewBlogPost,
  validateCategoryIds,
  validatePostUpdate,
};

const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_CONFLICT = 409;

const displayNameError = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"displayName" length must be at least 8 characters long',
  },
};

const emailNotValidError = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"email" must be a valid email',
  },
};

const emailRegisteredError = {
  status: HTTP_STATUS_CONFLICT,
  err: {
    message: 'User already registered',
  },
};

const emailRequiredError = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"email" is required',
  },
};

const emailEmptyError = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"email" is not allowed to be empty',
  },
};

const passwordLengthError = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"password" length must be 6 characters long',
  },
};

const passwordRequiredError = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"password" is required',
  },
};

const passwordEmptyError = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"password" is not allowed to be empty',
  },
};

const invalidFieldsError = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: 'Invalid fields',
  },
};

const invalidTokenError = {
  status: HTTP_STATUS_UNAUTHORIZED,
  err: {
    message: 'Expired or invalid token',
  },
};

const tokenNotFoundError = {
  status: HTTP_STATUS_UNAUTHORIZED,
  err: {
    message: 'Token not found',
  },
};

const userNotExist = {
  status: HTTP_STATUS_NOT_FOUND,
  err: {
    message: 'User does not exist',
  },
};

const categoryNameRequired = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"name" is required',
  },
};

const postTitleRequired = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"title" is required',
  },
};

const postContentRequired = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"content" is required',
  },
};

const postCategoryIdRequired = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"categoryIds" is required',
  },
};

const categoryNotFound = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: '"categoryIds" not found',
  },
};

const postNotExist = {
  status: HTTP_STATUS_NOT_FOUND,
  err: {
    message: 'Post does not exist',
  },
};

const unauthorizedUser = {
  status: HTTP_STATUS_UNAUTHORIZED,
  err: {
    message: 'Unauthorized user',
  },
};

const categoryCannotUpdate = {
  status: HTTP_STATUS_BAD_REQUEST,
  err: {
    message: 'Categories cannot be edited',
  },
};

module.exports = {
  displayNameError,
  emailRequiredError,
  emailNotValidError,
  emailRegisteredError,
  emailEmptyError,
  passwordLengthError,
  passwordRequiredError,
  passwordEmptyError,
  invalidFieldsError,
  invalidTokenError,
  tokenNotFoundError,
  userNotExist,
  categoryNameRequired,
  postTitleRequired,
  postContentRequired,
  postCategoryIdRequired,
  categoryNotFound,
  postNotExist,
  unauthorizedUser,
  categoryCannotUpdate,
};

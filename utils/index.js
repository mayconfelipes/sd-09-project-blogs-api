module.exports = {
  SECRET: 'I love my family',
  code: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
  },
  message: {
    INVALID_ENTRYES: 'Invalid entries. Try again.',
    INCORRECT_USER_PASSWORD: 'Incorrect username or password',
    ALL_FIELDS_MUST_BY: 'All fields must be filled',
    RECIPE_NOT_FOUND: 'recipe not found',
    ONLY_ADMIN: 'Only admins can register new admins',
    DISPLAY_NAME_LENGTH: '"displayName" length must be at least 8 characters long',
    PASS_LENGTH: '"password" length must be 6 characters long',
    INVALID_EMAIL: '"email" must be a valid email',
    CONFLICT_MESSAGE: 'User already registered',
    BAD_REQUEST_MESSAGE: 'Invalid fields',
    MISSING_AUTH_TOKEN: 'Token not found',
    JWT_ERROR: 'Expired or invalid token',
  },
};

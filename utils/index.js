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
    JWT_MALFORMED: 'jwt malformed',
    RECIPE_NOT_FOUND: 'recipe not found',
    MISSING_AUTH_TOKEN: 'missing auth token',
    ONLY_ADMIN: 'Only admins can register new admins',
  },
};

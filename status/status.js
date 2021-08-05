const status = {
  OK: 200,
  BAD_REQUEST: 400,
  BAD_REQUEST_MESSAGE: 'Invalid entries. Try again.',
  CREATED: 201,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  NOT_FOUND_MESSAGE: 'recipe not found',
  ERRO: 500,
  CONFLICT: 409,
  CONFLICT_MESSAGE: 'User already registered',
  FILLFIELDS: 401,
  FILLFIELDS_MESSAGE: 'All fields must be filled',
  INCORRECT: 401,
  INCORRECT_MESSAGE: 'Incorrect username or password',
  NOT_CONTENT: 204,
  MISSING: 'missing auth token',
  MALFORMED: 'jwt malformed',
  EXPIRED: 'Expired or invalid token',
};

module.exports = status;
class JWTError extends Error {
  constructor(message) {
    super();
    this.name = 'JWTError';
    this.http = 401;
    this.message = message === 'jwt must be provided'
      ? 'missing auth token'
      : message;
  }
}

module.exports = JWTError;
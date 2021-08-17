module.exports = (err, _req, res, _next) => {
  const allErrors = {
    BAD_REQUEST: 400,
    TOKEN_NOT_FOUND: 401,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  };

  return res.status(allErrors[err.code]).json({ message: err.message });
};

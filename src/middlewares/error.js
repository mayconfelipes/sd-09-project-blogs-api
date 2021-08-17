module.exports = (err, _req, res, _next) => {
  const allErrors = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  };

  return res.status(allErrors[err.code]).json({ message: err.message });
};

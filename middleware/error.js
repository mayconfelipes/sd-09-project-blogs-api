const errorHandling = (error, _req, res, _next) => {
  const INTERNAL_SERVER_ERROR = 500;

  const statusByErrorName = {
    invalidField: 400,
    userAlreadyExist: 409,
  };

  const status = statusByErrorName[error.name] || INTERNAL_SERVER_ERROR;
  return res.status(status).json({ message: error.message });
};

module.exports = errorHandling;
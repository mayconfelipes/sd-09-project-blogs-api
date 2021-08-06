const validateError = (status, message) => ({
  status,
  message,
});

const errorMiddleware = (error, _req, res, _next) => {
  if (error.status) {
    const { status, message } = error;
    res.status(status).json({ message });
  } else {
    return res.status(500).json({
      code: 'internal',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  validateError,
  errorMiddleware,
};
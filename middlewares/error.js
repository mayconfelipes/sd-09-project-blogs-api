const getError = (err, _req, res, _next) => {
  console.log(err.message);
  if (err.message === '"password" length must be at least 6 characters long') {
    const { status } = err;
    return res.status(status).json({ message: '"password" length must be 6 characters long' });
  }
  if (err.status) {
    const { status, message } = err;
    return res.status(status).json({ message });
  }
  return res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  });
};

module.exports = getError;

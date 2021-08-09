const errorTypes = {
  userExists: { statusCode: 409, message: 'User already registered' },
};

module.exports = async (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  if (err.type) {
    const { statusCode, message } = errorTypes[err.type];
    return res.status(statusCode).json({ message });
  }

  console.error(err);

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};

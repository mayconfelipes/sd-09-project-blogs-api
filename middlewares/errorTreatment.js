const { UniqueConstraintError } = require('sequelize');

module.exports = (error, _req, res, _next) => {
  if (error.constructor === UniqueConstraintError) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }

  const { http = 500, message } = error;
  const body = { message };

  return res.status(http).json(body);
};

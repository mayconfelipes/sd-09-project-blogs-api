const jwt = require('../utils/jwt');

const login = async (req, res) => {
  const token = await jwt(req.body);
  res.status(200).json({ token });
};

module.exports = { login };

const jwt = require('jsonwebtoken');
require('dotenv');

const { SECRET_KEY } = process.env;

module.exports = async (req, res, _next) => {
  const { user } = req.body;
  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, SECRET_KEY, jwtConfig);

    res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

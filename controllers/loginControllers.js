require('dotenv').config();
const jwt = require('jsonwebtoken');
const validate = require('../service/userServices');

module.exports = {
  validateLogin: async (req, res, next) => {
    const { email, password } = req.body;

    const isValidCredentials = await validate.checkingLogin(email, password);

    if (isValidCredentials.statusCode) {
      return next(
        { statusCode: isValidCredentials.statusCode, message: isValidCredentials.message },
      );
    }

    const { password: _, ...withoutPassword } = isValidCredentials;

    const jwtConfig = {
      expiresIn: '23h',
      algorithm: 'HS256',
    };

    const token = jwt.sign(withoutPassword, process.env.JWT_SECRET, jwtConfig);

    return res.status(200).json({ token });
  },
};

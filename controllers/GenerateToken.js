const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const GenerateToken = (req, res, next) => {
  const { email, name, password } = req.body;
  const user = { email };

  if (!name) {
    user.password = password;
  } else {
    user.name = name;
  }
  
  const token = jwt.sign(
    { data: user },
    process.env.JWT_SECRET,
    jwtConfig,
  );
  req.token = token;
  next();
};

module.exports = GenerateToken;

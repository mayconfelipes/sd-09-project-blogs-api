const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { checkLogin } = require('../services/login');
const { getUser } = require('../services/user');

const { EXPIRES_IN, ALGORITHM, JWT_SECRET } = process.env;

const login = rescue(async (req, res) => {
  const { email, password } = req.body;

  const { error } = checkLogin({ email, password });
  if (error) return res.status(400).json(error.details[0]);

  const user = await getUser(email);
  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  const token = jwt.sign(
  {
    data: { id: user.id, email },
  },
  JWT_SECRET,
  {
    expiresIn: EXPIRES_IN,
    algorithm: ALGORITHM,
  },
  );
  req.headers.authorization = token;
  return res.status(200).json({ token });
});

module.exports = { login };

const { auth } = require('../utils');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = auth.createToken({ displayName, email });
  res.status(201).json({ token });
};

module.exports = {
  create,
};
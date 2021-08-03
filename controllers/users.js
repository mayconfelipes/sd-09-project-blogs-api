const services = require('../services');

const signIn = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const {
    status,
    token,
    message,
  } = await services.users.signIn(displayName, email, password, image);

  if (status !== 201) return res.status(status).json({ message });
  res.status(status).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const {
    status,
    token,
    message,
  } = await services.users.login(email, password);

  if (status !== 200) return res.status(status).json({ message });
  res.status(status).json({ token });
};

module.exports = {
  signIn,
  login,
};
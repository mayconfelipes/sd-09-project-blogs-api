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

module.exports = {
  signIn,
};
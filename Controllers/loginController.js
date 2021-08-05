const singLogin = async (req, res, _next) => {
  const { token } = req.authorization;
  res.status(200).json({ token });
};

module.exports = singLogin;
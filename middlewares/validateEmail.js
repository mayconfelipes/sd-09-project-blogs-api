const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (email === '') {
    return res
      .status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res
    .status(400)
    .json({ message: '"email" is required' });
  }
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validation) {
    return res
        .status(400)
        .json({ message: '"email" must be a valid email' }); 
  }
  next();
};

module.exports = validateEmail;
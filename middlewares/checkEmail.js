const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email) {
    return res.status(400).send({ message: '"email" is required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: '"email" must be a valid email' });
  }
  return next();
};

module.exports = checkEmail; 

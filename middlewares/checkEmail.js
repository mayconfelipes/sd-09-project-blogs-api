const checkEmail = async (req, res, next) => {
    const { email } = req.body;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
      return res.status(400).send({
        message: '"email" is not allowed to be empty',
      });
    }

    if (!email) {
      return res.status(400).send({ message: '"email" is required' });
    }

    if (!validEmail.test(email)) {
      return res.status(400).send({ message: '"email" must be a valid email' });
    }
    return next();
  };
  
  module.exports = checkEmail;
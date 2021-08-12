const checkPassword = (req, res, next) => {
    const { password } = req.body;
    const validPassword = /^(?=.{6,})/;

    if (password === '') {
      return res.status(400).send({
        message: '"password" is not allowed to be empty',
      });
    }

    if (!password) {
      return res.status(400).send({
        message: '"password" is required',
      });
    }
  
    if (!validPassword.test(password)) {
      return res.status(400).send({
          message: '"password" length must be 6 characters long',
      });
    }
    return next();
  };
  
  module.exports = checkPassword;
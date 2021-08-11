/* regras de negócio */
const validateEmail = async (request, response, next) => {
  const { email } = request.body;
  // console.log(`Imprimindo valor de email em user/services ${email}`);

  if (!email) {
    return response.status(400).json({ message: '"email" is required' });
  }
  next();
};

const validatePassword = async (request, response, next) => {
  const { password } = request.body;
  // console.log(`Imprimindo valor de password em user/services ${password}`);

  if (!password) {
    return response.status(400).json({ message: '"password" is required' });
  }
  next();
};

const emailIsNotNull = async (request, response, next) => {
  const { email } = request.body;

  if (email === '' || email === null) {
    return response.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  next();
};

const passwordIsNotNull = async (request, response, next) => {
  const { password } = request.body;

  if (password === '' || password === null) {
    return response.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  emailIsNotNull,
  passwordIsNotNull,
};
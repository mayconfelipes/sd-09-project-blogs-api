const LoginService = require('../services/loginService');
const { messages, codes } = require('../util/responseHandling');

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { response, code } = await LoginService.Login(email, password);
  
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

module.exports = { Login };
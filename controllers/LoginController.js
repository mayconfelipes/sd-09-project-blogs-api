const LoginService = require('../services/loginService');

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { response, code } = await LoginService.Login(email, password);
  
    res.status(code).json(response);
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = { Login };
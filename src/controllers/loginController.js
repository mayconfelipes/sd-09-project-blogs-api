const loginService = require('../services/loginService');

const loginUser = async (req, res) => {
  try {
    const { body } = req;
    const loginToken = await loginService.loginUser(body);

    return res.status(200).json(loginToken);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  loginUser,
}; 
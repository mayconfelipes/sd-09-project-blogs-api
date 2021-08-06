const loginServices = require('../services/loginServices');
const { code } = require('../helpers/messages');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginServices({ email, password });
    return res.status(code.OK).json(token);
  } catch (error) {
    return res.status(code.BAD_REQUEST).json({ message: error.message });
  }
};
module.exports = loginController;
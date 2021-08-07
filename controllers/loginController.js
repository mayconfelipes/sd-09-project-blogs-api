const loginServices = require('../services/loginServices');
const { code } = require('../helpers/messages');

const loginController = async (req, res) => {
  const { body } = req;
  try {
    const token = await loginServices(body);
    return res.status(code.OK).json(token);
  } catch (error) {
    return res.status(code.BAD_REQUEST).json({ message: error.message });
  }
};
module.exports = loginController;
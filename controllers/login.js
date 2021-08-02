const { loginService } = require('../services');

module.exports = async (req, res, next) => {
  try {
    const payload = req.body;

    const response = await loginService(payload);

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
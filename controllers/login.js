const { tokenGenerator } = require('../middlewares/index');

const login = async (req, res) => {
  try {
    res.status(200).send({ token: tokenGenerator(req.body) });
  } catch (error) {
    console.error(error);
    return res.status(304).json({ error: error.message });
  }
};

module.exports = {
  login,
};

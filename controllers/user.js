const { User } = require('../models/index');
const { tokenGenerator } = require('../middlewares/index');

const newUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUserInfo = { displayName, email, password, image };
     await User.create(newUserInfo);
    return res.status(201).send({ token: tokenGenerator({ email, password }) });
  } catch (error) {
    console.error(error);
    return res.status(304)
      .json({ error: error.message });
  }
};

module.exports = {
  newUser,
};

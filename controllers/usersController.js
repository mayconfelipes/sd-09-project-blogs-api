const { User } = require('../models');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((newUser) => {
      res.status(200).json(newUser);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send(e);
    });
};

module.exports = {
  createUser,
};
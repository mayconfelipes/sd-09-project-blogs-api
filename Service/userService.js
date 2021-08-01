const { User } = require('../models');
const userController = require('../controller/userController');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((e) => {
      const reply = userController.createUserReplyError(e.errors[0].message);
      res.status(reply.code).send({ message: reply.phrase }); 
    });
};

module.exports = {
  createUser,
};
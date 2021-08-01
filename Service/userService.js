const { User } = require('../models');
const userController = require('../controller/userController');

const createUser = async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((newUser) => {
      const reply = userController.createUserReplyOk(newUser);
      res.status(reply.code).json(reply.user);
    })
    .catch((e) => {
      const reply = userController.createUserReplyError(e.errors[0].message);
      res.status(reply.code).send({ message: reply.phrase }); 
    });
};

module.exports = {
  createUser,
};
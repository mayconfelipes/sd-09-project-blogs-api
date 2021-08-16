const express = require('express');
const { User } = require('../models/index');
const { 
  tokenGenerator,
  checkDisplayName,
  checkEmail,
  checkPassword,
  checkIfUserAlreadyExist,
  tokenValidation } = require('../middlewares/index');

const userRouter = express.Router();

userRouter.get('/', tokenValidation, (_req, res) => {
    User.findAll().then((data) => {
      const allUsersInfo = [];
      data.forEach((userInfo) => {
        const { displayName, email, id, image } = userInfo;
        const publicInfo = { displayName, email, id, image };
        allUsersInfo.push(publicInfo);
      });  
      return res.status(200).send(allUsersInfo);
    }).catch((e) => res.status(500).json({ message: e.message }));
});

userRouter.post('/', 
  checkDisplayName, 
  checkEmail,
  checkIfUserAlreadyExist,
  checkPassword,
  (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUserInfo = { displayName, email, password, image };

  User.create(newUserInfo)
    .then(() => res.status(201).send({ token: tokenGenerator({ email, password }) }))
    .catch((e) => res.status(304).send({ message: e.message }));
});

userRouter.get('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  User.findByPk(id).then((userInfo) => {
    const numberId = Number(id);
    const { displayName, email, image } = userInfo;
    const publicInfo = { displayName, email, id: numberId, image };
    return res.status(200).send(publicInfo);
  }).catch(() => res.status(404).send({ message: 'User does not exist' }));
});

userRouter.delete('/me', tokenValidation, async (req, res) => {
  const userId = req.user;
  await User.destroy({ where: { id: userId } })
  .then(() => res.status(204).send())
  .catch((e) => res.status(400).send({ Error: e.message })); 
});

module.exports = userRouter;
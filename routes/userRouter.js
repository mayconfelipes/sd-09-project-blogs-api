const express = require('express');
const { User } = require('../models/index');
const { 
  tokenGenerator,
  checkDisplayName,
  checkEmail,
  checkPassword,
  checkIfUserAlreadyExist } = require('../middlewares/index');

const userRouter = express.Router();

// userRouter.get('/', (_req, res) => {
//     User.findAll().then((data) => res.status(200).json(data)).catch((e) => {
//       console.log(e.message);
//       return res.status(500).json({ message: 'Algo deu Errado!' });
//     });
// });

userRouter.post('/', 
  checkDisplayName, 
  checkEmail,
  checkIfUserAlreadyExist,
  checkPassword,
  (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUserInfo = { displayName, email, password, image };

  User.create(newUserInfo)
    .then(() => res.status(201).send({ token: tokenGenerator({ email, password }) })).catch((e) => {
    console.log(e.message);
    return res.status(304).send({ message: 'Novo usuário não foi cadastrado. Algo deu Errado' });
  });
});

module.exports = userRouter;
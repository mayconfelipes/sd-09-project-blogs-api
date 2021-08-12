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
    }).catch((e) => {
      console.log(e.message);
      return res.status(500).json({ message: e.message });
    });
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
    .then(() => res.status(201).send({ token: tokenGenerator({ email, password }) })).catch((e) => {
    console.log(e.message);
    return res.status(304).send({ message: e.message });
  });
});

module.exports = userRouter;
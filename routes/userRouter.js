const express = require('express');
const { User } = require('../models/index');
const { tokenGenerator, validateNewUserInput } = require('../middlewares/index');

const router = express.Router();

router.get('/', (_req, res) => {
    User.findAll().then((data) => res.status(200).json(data)).catch((e) => {
      console.log(e.message);
      return res.status(500).json({ message: 'Algo deu Errado!' });
    });
});

router.post('/', validateNewUserInput, (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUserInfo = { displayName, email, password, image };

  User.create(newUserInfo)
    .then(() => res.status(201).send({ token: tokenGenerator(newUserInfo) })).catch((e) => {
    console.log(e.message);
    return res.status(304).send({ message: 'Novo usuário não foi cadastrado. Algo deu Errado' });
  });
});

module.exports = router;
const express = require('express');
const { User } = require('../models/index');

const router = express.Router();

router.get('/', (_req, res) => {
    User.findAll().then((data) => {
      res.status(200).json(data);
    }).catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu Errado!' });
    });
  });

  router.post('/', (req, res) => {
    const { displayName, email, password, image } = req.body;
    const newUserInfo = { displayName, email, password, image };

    User.create(newUserInfo).then(() => {
      res.status(201).send({ message: 'Token' });
    }).catch((e) => {
      console.log(e.message);
      res.status(304).send({ message: 'Novo usuário não foi cadastrado. Algo deu Errado' });
    });
  });

  module.exports = router;
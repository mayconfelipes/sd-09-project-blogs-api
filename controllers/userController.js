const express = require('express');
const { User } = require('../models');
const {
tokenGenerate,
validPassword,
validEmail,
registeredEmail,

} = require('../service/validateUsrReg');
const validateJWT = require('../service/validateJWT');

const router = express.Router();

// codigo de resposta em algarismos romanos
const cc = 200;
const cci = 201;
// const z = 0;
// const cdxxii = 422;
// const cd = 400;
// const cdi = 401;
const cdiv = 404;
// const cdix = 409;
// const d = 500;

// Este endpoint usa o método create do Sequelize para salvar um usuário no banco.
router.post('/', validPassword, validEmail, registeredEmail, async (req, res) => {
  await User.create(req.body);
  const tk = tokenGenerate(req.body);
  return res.status(cci).json(tk);
});

 router.get('/', validateJWT, async (req, res) => {
    const user = await User.findAll();
    return res.status(cc).json(user);
  });

// Este endpoint usa o método findByPk do Sequelize para buscar um usuário pelo id.
router.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(cdiv).json({ message: 'User does not exist' });

    return res.status(cc).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(e).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
const express = require('express');
// const { User } = require('../models');
const {
tokenGenerate,
validLogin,
findUserLogin,
} = require('../service/validateUsrReg'); // // // Login // // // //

const router = express.Router();

// codigo de resposta em algarismos romanos
const cc = 200;
// const cci = 201;
// const z = 0;
// const cdxxii = 422;
// const cd = 400;
// const cdiv = 404;
// const cdix = 409;
// const d = 500;

// Este endpoint usa o método create do Sequelize para salvar um usuário no banco.
router.post('/', validLogin, findUserLogin, async (req, res) => {
  const tk = tokenGenerate(req.body);
  return res.status(cc).json(tk);
});

/* router.get('/', async (req, res) => {
  try {
    const user = await User.findAll();
    if (!user) return res.status(404).json({ message: 'Usuários não encontrados' });
    return res.status(cc).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(d).json({ message: 'Algo deu errado' });
  }
}); */

// Este endpoint usa o método findByPk do Sequelize para buscar um usuário pelo id.
/* router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(cc).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(d).json({ message: 'Algo deu errado' });
  }
}); */

// Este endpoint usa o método findOne do Sequelize para buscar um usuário pelo id e email.
// URL a ser utilizada para o exemplo http://localhost:3000/user/search/1?email=aqui-o-email
/* router.get('/search/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    const user = await User.findOne({ where: { id, email } });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(cc).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(d).json({ message: 'Algo deu errado' });
  }
}); */

// Este endpoint usa o método update do Sequelize para alterar um usuário no banco.
/* router.put('/:id', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const { id } = req.params;

    const [updateUser] = await User.update(
      { fullName, email },
      { where: { id } },
    );

    console.log(updateUser); // confira o que é retornado quando o user com o id é ou não encontrado;

    if (!updateUser) return res.status(cdiv).json({ message: 'Usuário não encontrado' });

    return res.status(cc).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(d).json({ message: 'Algo deu errado' });
  }
}); */

// Este endpoint usa o método destroy do Sequelize para remover um usuário no banco.
/* router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.destroy(
      { where: { id } },
    );

    console.log('ctrl92', deleteUser); // confira o que é retornado quando o user com o id é ou não encontrado;

    return res.status(cc).json({ message: 'Usuário excluído com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(d).json({ message: 'Algo deu errado' });
  }
}); */

module.exports = router;
 const express = require('express');
 const { Categories } = require('../models');
  
 const validateJWT = require('../service/validateJWT');
 
 const router = express.Router();
 
// codigo de resposta em algarismos romanos
 const cc = 200;
 const cci = 201;
// const z = 0;
// const cdxxii = 422;
const cd = 400;
const cdi = 401;
// const cdiv = 404;
// const cdix = 409;
// const d = 500;
 
router.post('/', validateJWT, async (req, res) => {
  try {
    if (!req.body.name) return res.status(cd).json({ message: '"name" is required' });
    const cat = await Categories.create(req.body);
    const getid = await Categories.findOne({ where: { name: cat.name } });
    if (!cat) return res.status(cdi).json({ message: 'Usuário não encontrado' });
    return res.status(cci).json({ name: cat.name, id: getid.id });
  } catch (e) {
    console.log(e.message);
    res.status(e).json({ message: 'Algo deu errado' });
  }
}); 

router.get('/', validateJWT, async (req, res) => {
  try {
    const all = await await Categories.findAll();
    return res.status(cc).json(all);
  } catch (e) {
    console.log(e.message);
    res.status(e).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
const { Router } = require('express');

const { Users } = require('../models');
const { loginValidation } = require('../middlewares/loginValidation');
const { createToken } = require('../helpers/jwt');

const router = new Router();

router.post('/', loginValidation, async (req, res) => {
  const { email } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = createToken(email);

  return res.status(200).json({ token });
});

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const validate = require('../middlewares/login');
const { BADREQUEST, INTERNERERROR, OK } = require('../ultils');

const JWT_SECRET = 'senhaforte';

const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

const router = express.Router();

router.post('/', validate.validateLogin, async (req, res) => {
    const { email, password } = req.body;

    if (!password) { 
        return res.status(BADREQUEST).json({ message: '"password" is required' }); 
      }
    if (password.length === 0) {
        return res.status(BADREQUEST).json({ message: 'is not allowed to be empty' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(BADREQUEST).json({ message: 'Invalid fields' });
        }

        const { password: pass, ...newUser } = user.dataValues;

        const token = jwt.sign(newUser, JWT_SECRET, jwtConfig);

        res.status(OK).json({ token });
    } catch (error) {
        res.status(INTERNERERROR).json({ error });
    }
});

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { CONFLICT, CREATE, INTERNERERROR } = require('../ultils');

const { create } = require('../services/servicesUser');

const router = express.Router();

const JWT_SECRET = 'senhaforte';

const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

router.post('/', async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const result = await create({ displayName, email, password, image });
    if (typeof result === 'object') {
       return res.status(result.code).json(result.message);
    }
    const verifyEmail = await User.findOne({ where: { email } });
    console.log(verifyEmail);
    if (verifyEmail) return res.status(CONFLICT).json({ message: 'User already registered' });

    try {
        const newUser = await User.create({ displayName, email, password, image });
        
        const { password: pass, ...user } = newUser.dataValues;
        console.log(user);
        
        const token = jwt.sign(user, JWT_SECRET, jwtConfig);
    
        return res.status(CREATE).json({ token });
      } catch (e) {
        console.log(e.message);
        res.status(INTERNERERROR).json({ message: 'Algo deu errado' });
      }
});

module.exports = router;
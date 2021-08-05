const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { CONFLICT, CREATE, INTERNERERROR, BADREQUEST, OK } = require('../ultils');

const validate = require('../middlewares/user');
const { auth } = require('../middlewares/auth');

const router = express.Router();

const JWT_SECRET = 'senhaforte';

const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

router.post('/', validate.validateIn, async (req, res) => {
    const { displayName, email, password, image } = req.body;
    if (!password) { 
        return res.status(BADREQUEST).json({ message: '"password" is required' }); 
      }
   
    const verifyEmail = await User.findOne({ where: { email } });
   
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

router.get('/', auth, async (req, res) => {
    try {
        const getAll = await User.findAll();
        return res.status(OK).json(getAll);
    } catch (error) {
        res.status(INTERNERERROR).json(error);
    }
});

module.exports = router;
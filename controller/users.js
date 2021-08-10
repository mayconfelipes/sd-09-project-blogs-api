const express = require('express');

const jwt = require('jsonwebtoken');

const { User } = require('../models');

const validate = require('../middlewares/users');
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
        return res.status(400).json({ message: '"password" is required' }); 
      }
   
    const verifyEmail = await User.findOne({ where: { email } });
   
    if (verifyEmail) return res.status(409).json({ message: 'User already registered' });

    try {
        const newUser = await User.create({ displayName, email, password, image });
        
        const { password: pass, ...user } = newUser.dataValues;
        console.log(user);
        
        const token = jwt.sign(user, JWT_SECRET, jwtConfig);
    
        return res.status(201).json({ token });
      } catch (e) {
        console.log(e.message);
       return res.status(500).json({ message: 'Algo deu errado' });
      }
});

router.get('/', auth, async (req, res) => {
    try {
        const getAll = await User.findAll();
        return res.status(200).json(getAll);
    } catch (error) {
       return res.status(500).json(error);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        
        const getByid = await User.findByPk(id);

        if (!getByid) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        return res.status(200).json(getByid);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.delete('/me', auth, async (req, res) => {
    const { email } = req.user;
  
    await User.destroy({ where: { email } });
  
    return res.status(204).json({});
  });

module.exports = router;
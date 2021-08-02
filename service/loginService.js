const jwt = require('jsonwebtoken');
const { User } = require('../models');
// const userController = require('../controller/userController');
require('dotenv').config();

process.env.JWT_SECRET

const createToken = (logon) => {
  
  const loged = logon.dataValues;
  delete loged.password;
  
  console.log('------   loged ---------', {loged})

  const SECRET = process.env.JWT_SECRET;
  console.log('----------- secret -------- ', SECRET)
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  console.log('--------------- jwtConfig ----------- ', jwtConfig)


  const token = jwt.sign(loged, SECRET, jwtConfig);
  console.log('--- token -----------------', token)

  return token;  
};

const loginUser = (req, res, _next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email, password } })
    .then((selectUser) => {
      const token = createToken(selectUser)
      // const reply = userController.createUserReplyOk(newUser);
      // res.status(reply.code).json(reply.user);
      res.status(200).json({token});
    })
    .catch((e) => {
      // const reply = userController.createUserReplyError(e.errors[0].message);
      // res.status(reply.code).send({ message: reply.phrase }); 
      res.status(400).send(e); 
    });
};

module.exports = {
  loginUser,
};

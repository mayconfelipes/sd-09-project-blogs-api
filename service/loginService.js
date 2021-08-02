const jwt = require('jsonwebtoken');
const { User } = require('../models');
const loginController = require('../controller/loginController');

require('dotenv').config();

const createToken = (logon) => {  
  const loged = logon.dataValues;
  delete loged.password;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(loged, process.env.JWT_SECRET, jwtConfig);

  return token;  
};

// const loginUser = (req, res, _next) => {
//   const { email, password } = req.body;
//   User.findOne({ where: { email, password } })
//     .then((selectUser) => {
//       const reply = loginController.loginUserReplyOk();
//       const token = createToken(selectUser);
//       res.status(reply.code).json({ token });
//     })
//     .catch((e) => {
//       const reply = userController.createUserReplyError (e.errors[0].message);
//       // res.status(reply.code).send({ message: reply.phrase }); 
//       res.status(400).send(e); 
//     });
// };

const loginUser = async (req, res, _next) => {
  const { email, password } = req.body;
  const toTest = {
    email,
    password,
    selectUser: {},
  };
    
  const replyError = loginController.loginUserReplyError(toTest);
  if (replyError) return res.status(replyError.code).send({ message: replyError.phrase });
    
  toTest.selectUser = await User.findOne({ where: { email, password } });
  if (!toTest.selectUser) {
    const replySelectUserError = loginController.loginUserReplyError(toTest);
    return res.status(replySelectUserError.code).send({ message: replySelectUserError.phrase });
  }

  const reply = loginController.loginUserReplyOk();
  const token = createToken(toTest.selectUser);
  return res.status(reply.code).json({ token });
};

module.exports = {
  loginUser,
};

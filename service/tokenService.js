const jwt = require('jsonwebtoken');
const { User } = require('../models');
const tokenController = require('../controller/tokenController');

require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const selectUser = await User.findOne({ where: { email: decode.email } });
  
    const { password, ...nopass } = selectUser.dataValues;
    req.user = nopass;
    next();
  } catch (err) {
    const vraw = err.toString();
    
    const replyError = tokenController.tokenReplyError(vraw);
    if (replyError) return res.status(replyError.code).send({ message: replyError.phrase });
  }
};

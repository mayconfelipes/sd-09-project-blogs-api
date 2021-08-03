const jwt = require('jsonwebtoken');
const status = require('../statusCode/status');
const loginService = require('../services/loginService');

const secret = 'trybe-t9';

const loginUser = async (req, res) => {
  const bodyReq = req.body;
  const result = await loginService.loginUser(bodyReq);
 console.log(result);
  if (!result.message && result.message !== 'Invalid fields') {
    const token = jwt.sign({ result }, secret, {
        expiresIn: '1h', algorithm: 'HS256',
    });
    return res.status(status.OK).json({ token });
}
return res.status(status.BAD_REQUEST).json(result);
}; 

module.exports = {
  loginUser,
};

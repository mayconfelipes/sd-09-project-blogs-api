const jwt = require('jsonwebtoken');

const SECRET = 'jwtSenha';

const validateToken = (request, response, next) => {
  const token = request.headers.authorization;
  // console.log(token);
  if (!token) return response.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, SECRET);
    // console.log(`Imprimindo valor de decodedToken em validateToken/helpers ${decoded}`);
    request.user = decoded;
    // console.log(`Imprimindo valor de request.user em validateToken/helpers ${request.user}`);
    return next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;
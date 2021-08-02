const stateUnauthorized = 401;

const replyToken = (err) => {
  if (err === 'JsonWebTokenError: jwt malformed') {
    return { code: stateUnauthorized, phrase: 'Expired or invalid token' };
  }
  
  if (err === 'JsonWebTokenError: jwt must be provided') {
    return { code: stateUnauthorized, phrase: 'Token not found' };
  }
};

const tokenReplyError = (err) => {
  const tokenError = replyToken(err);
  if (tokenError) return tokenError;
};

module.exports = {
  tokenReplyError,
};

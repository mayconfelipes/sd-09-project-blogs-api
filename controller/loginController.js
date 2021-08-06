const stateok = 200;
const stateBadRequest = 400;
const validator = require('validator');

const replyEmail = (email) => {
  if (email === undefined) {
    return { code: stateBadRequest, phrase: '"email" is required' };
  }
  
  const emptyEmail = validator.default.isEmpty(email);
  if (emptyEmail) {
    return { code: stateBadRequest, phrase: '"email" is not allowed to be empty' };
  }
};

const replyPassword = (password) => {
  if (password === undefined) {
    return { code: stateBadRequest, phrase: '"password" is required' };
  }

  const emptyPassword = validator.default.isEmpty(password);
  if (emptyPassword) {
    return { code: stateBadRequest, phrase: '"password" is not allowed to be empty' };
  }
};
const replySelectUser = (selectUser) => {
  if (selectUser === null) {
    return { code: stateBadRequest, phrase: 'Invalid fields' };
  }
};

const loginUserReplyError = ({ email, password, selectUser }) => {
  const emailError = replyEmail(email);
  if (emailError) return emailError;

  const passwordError = replyPassword(password);
  if (passwordError) return passwordError;

  const selectUserError = replySelectUser(selectUser);
  if (selectUserError) return selectUserError;
};

const loginUserReplyOk = () =>  
   ({ code: stateok });

module.exports = {
  loginUserReplyError,
  loginUserReplyOk,
};

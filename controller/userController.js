const stateOk = 200;
const stateCreated = 201;
const stateConflict = 409;
const stateBadRequest = 400;

const replyName = (answer) => {
  if (answer === 'Validation len on displayName failed') {
    return {
      code: stateBadRequest,
      phrase: '"displayName" length must be at least 8 characters long',
    };
  }
};

const replyEmail = (answer) => {
  if (answer === 'Validation isEmail on email failed') {
    return { code: stateBadRequest, phrase: '"email" must be a valid email' };
  }

  if (answer === 'User.email cannot be null') {
    return { code: stateBadRequest, phrase: '"email" is required' };
  }  

  if (answer === 'Users.email must be unique') {
    return { code: stateConflict, phrase: 'User already registered' };
  }
};

const replyPassword = (answer) => {
  if (answer === 'Validation len on password failed') {
    return { code: stateBadRequest, phrase: '"password" length must be 6 characters long' };
  }

  if (answer === 'User.password cannot be null') {
    return { code: stateBadRequest, phrase: '"password" is required' };
  }
};

const createUserReplyError = (answer) => {
  const nameError = replyName(answer);
  if (nameError) return nameError;

  const emailError = replyEmail(answer);
  if (emailError) return emailError;

  const passwordError = replyPassword(answer);
  if (passwordError) return passwordError;
};

// switch (selectResponse) {
  //  case 'Validation len on displayName failed':
  //    return { code: stateBadRequest, phrase: 'displayName length must be at least 8 characters long'};
  //  case 'Validation isEmail on email failed': 
  //    return { code: stateBadRequest, phrase: 'email must be a valid email'};
  //  case 'User.email cannot be null':
  //    return { code: stateBadRequest, phrase: 'email is required' };
  //  case 'Validation len on password failed':
  //    return { code: stateBadRequest, phrase: 'password length must be 6 characters long' };
  //  case 'User.password cannot be null':
  //    return { code: stateBadRequest, phrase: 'password is required' };
  //  case 'Users.email must be unique':
  //    return { code: stateConflict, phrase: 'User Already registered' };
  //  default: break;
  // }
  
const showAllOk = (usersList) => {
  const list = JSON.stringify(usersList, null, 2);
  return { code: stateOk, list };
};

const createUserReplyOk = (newUser) => {
  const user = newUser.dataValues;
  delete user.password;
  return { code: stateCreated, user };
};

module.exports = {
  createUserReplyError,
  createUserReplyOk,
  showAllOk,
};

const stateok = 200;
const stateBadRequest = 400;

const loginUserReplyError = (answer) => {
  // const nameError = replyName(answer);
  // if (nameError) return nameError;

  // const emailError = replyEmail(answer);
  // if (emailError) return emailError;

  // const passwordError = replyPassword(answer);
  // if (passwordError) return passwordError;
};

const loginUserReplyOk = (newUser) => {
  // const user = newUser.dataValues;
  // delete user.password;
  // return { code: stateCreated, user };
};

module.exports = {
  loginUserReplyError,
  loginUserReplyOk,
};

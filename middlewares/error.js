const statusByCode = {
  userAlreadyRegistered: 409,
  missingAuth: 401,
};

module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  console.log(err);

  if (err.error) {
    const { code, message } = err.error;
    res.status(statusByCode[code]).json({ message });
  }
};
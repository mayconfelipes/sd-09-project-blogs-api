const checkDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  const validDisplayName = /^(?=.{8,})/;

  if (!displayName) {
    return res.status(400).send({
      message: '"displayName" is required',
    });
  }

  if (!validDisplayName.test(displayName)) {
    return res.status(400).send({
        message: '"displayName" length must be at least 8 characters long',
    });
  }
  return next();
};

module.exports = checkDisplayName;
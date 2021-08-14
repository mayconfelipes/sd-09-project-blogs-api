const checkDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  const MIN_LENGTH_DISPLAYNAME = 8;

  if (!displayName) {
    return res.status(400).send({
      message: '"displayName" is required',
    });
  }

  if (displayName.length < MIN_LENGTH_DISPLAYNAME) {
    return res.status(400).send({
        message: '"displayName" length must be at least 8 characters long',
    });
  }
  return next();
};

module.exports = checkDisplayName;

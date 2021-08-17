const validateDisplayName = (str, res) => {
  if (str.length < 8) {
    console.log('caiu aqui');
    return res
    .status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }
};

module.exports = validateDisplayName;
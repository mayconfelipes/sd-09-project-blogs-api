module.exports = (err, _req, res, _next) => {
  const { message } = err;

  if (message === 'User already registered') {
    return res.status(409).json({ message: err.message });
  }

  if (message === '"password" length must be at least 6 characters long') {
    return res
      .status(400)
      .json({ message: '"password" length must be 6 characters long' });
  }

  if (message === 'User does not exist') {
    return res.status(404).json({ message: err.message });
  }

  res.status(400).json({ message: err.message });
};

module.exports = (err, _req, res, _next) => {
  if (err.error) {
    const { statusCode, message } = err.error;

    return res.status(statusCode).json({ message });
  }

  if (err.message === '"categoryIds" not found') {
    return res.status(400).json({ message: err.message });
  } 

  return res.status(500).json({ message: 'Internal error' });
};

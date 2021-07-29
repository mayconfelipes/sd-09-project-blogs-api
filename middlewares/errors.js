module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  console.log(err);

  return res.status(500).json({ message: `Internal server error: ${err.message}` });
};
const { HTTP_SERVERERROR_STATUS } = require('../helpers/statusProtocoloHTTP');

module.exports = (err, _req, res, _next) => {
  if (err.status) {
    console.log(err);
    return res.status(err.status).json({ message: err.err });
  }
  return res.status(HTTP_SERVERERROR_STATUS).json({ message: err.message });
};
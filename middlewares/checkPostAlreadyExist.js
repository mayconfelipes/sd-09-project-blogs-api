const { BlogPost } = require('../models');

const checkIfPostAlreadyExist = async (req, res, next) => {
  const { id } = req.params;
  const Post = await BlogPost.findOne({ where: { id } });
  
  if (!Post) return res.status(404).send({ message: 'Post does not exist' });
  
  return next();
};

module.exports = checkIfPostAlreadyExist;

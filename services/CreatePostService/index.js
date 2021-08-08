const { BlogPost } = require('../../models');
const { User } = require('../../models');
const validatePost = require('../validatePost');
const { verifyToken } = require('../../middlewares/Auth/jwt');

module.exports = async (token, post) => {
  await validatePost(post);

  const { email } = await verifyToken(token);
  const user = await User.findOne({ where: { email } });
  const result = await BlogPost.create({ ...post, userId: user.id });

  return {
    id: result.id,
    userId: result.userId,
    title: result.title,
    content: result.content,
  };
};

const { BlogPost } = require('../models/index');

const checkPostUser = async (req, res, next) => {
    const userId = req.user;
    const { id } = req.params;
    const postUserId = await BlogPost.findByPk(id);
    
    if (userId !== postUserId.userId) return res.status(401).send({ message: 'Unauthorized user' });
    return next();
};

module.exports = checkPostUser;

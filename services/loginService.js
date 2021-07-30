const { User } = require('../models');

const loginService = async (userMail, userPassword) => {
    const user = await User.findOne({ where: { email: userMail } });
    
    if (!user || user.password !== userPassword) return ({ error: 'Invalid fields' });
    
    return true;
};

module.exports = { loginService };
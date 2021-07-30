const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Categories } = require('../models');

const cdi = 401;
const cd = 400;
const secret = process.env.JWT_SECRET;

const checkToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(cdi).json({ message: 'Token not found' });
  }
  
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(cdi).json({ message: 'Expired or invalid token' });
  }
  try { 
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.email } });
    const container = { ...user };
    
    if (!user) {
      return res.status(cdi).json({ message: 'Expired or invalid token' });
    }
    req.body.userId = container.dataValues.id;
    console.log(req.body);
    next();
  } catch (err) { return res.status(cdi).json({ message: 'Expired or invalid token' }); }
};

const checkCat = async (req, res, next) => {
const ids = req.body.categoryIds;
const arr = [];
const contentOfpromise = await Categories.findAll().then((result) => result);
const cat = { ...contentOfpromise };
arr.push(cat['0'].id);
arr.push(cat['1'].id);
console.log(arr, ids);
if (!ids.every((item) => arr.includes(item))) { 
  return res.status(cd).json({ message: '"categoryIds" not found' });
 } next();
};
const validFilds = (req, res, next) => {
if (!req.body.title) { return res.status(cd).json({ message: '"title" is required' }); }
if (!req.body.content) { return res.status(cd).json({ message: '"content" is required' }); }
if (!req.body.categoryIds) { return res.status(cd).json({ message: '"categoryIds" is required' }); }
next();
};
module.exports = { checkCat, checkToken, validFilds };

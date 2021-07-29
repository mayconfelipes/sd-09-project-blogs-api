const { getToken } = require('./auth');
const models = require('../models');

const validateDisplayName = (req, res, next) => {
    const { displayName } = req.body;
    if (displayName.length < 8) {
      return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    return next();
  };

  const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    const isValid = regex.test(email);
    if (!email) return res.status(400).json({ message: '"email" is required' });
    if (!isValid) return res.status(400).json({ message: '"email" must be a valid email' });
    return next();
  };

  const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: '"password" is required' });
    if (password && password.length < 6) {
      return res.status(400)
      .json({ message: '"password" length must be 6 characters long' });
    }
    return next();
  };

  const erro = (error, _req, res, _next) => {
    console.log(error);
    return res.status(500).send();
  };

  const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (email === '') {
       return res.status(400).json({
       message: '"email" is not allowed to be empty' });
    }
    if (password === '') {
       return res.status(400).json({
       message: '"password" is not allowed to be empty' });
    }
    if (!email) { 
        return res.status(400).json({ 
        message: '"email" is required' });
    }
    if (!password) { 
        return res.status(400).json({ 
        message: '"password" is required' });
    }
    next();
  };

  const postValidation = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
  
    if (!title) { 
      return res.status(400).json({ message: '"title" is required' }); 
    }
  
    if (!content) { 
      return res.status(400).json({ message: '"content" is required' }); 
    }
  
    if (!categoryIds) { 
      return res.status(400).json({ message: '"categoryIds" is required' }); 
    }
  
    next();
  };
  
  const categoryValidation = async (req, res, next) => {
    const { categoryIds } = req.body;
  
    const category = await models.Categories.findAll();
    const mapCategory = category.map(({ id }) => id);
  
    for (let i = 0; i < categoryIds.length; i += 1) {
      if (!mapCategory.includes(categoryIds[i])) {
        return res.status(400).json({ message: '"categoryIds" not found' });
      }
    }
  
    next();
  };

  module.exports = {
    validateDisplayName,
    validateEmail,
    validatePassword,    
    erro,
    validateLogin,
    getToken,
    postValidation,
    categoryValidation,
  };
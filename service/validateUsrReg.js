const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../models');

// codigo de resposta em algarismos romanos
// const cc = 200;
// const cci = 201;
// const z = 0;
// const cdxxii = 422;
const cd = 400;
// const cdiv = 404;
const cdix = 409;
// const d = 500;

// mensagens de erro
const errLogin = { message: '"email" must be a valid email' };
const errNopass = { message: '"password" is required' };
const errPass = { message: '"password" length must be 6 characters long' };
const errName = { message: '"displayName" length must be at least 8 characters long' };
const errNoemail = { message: '"email" is required' };
const errdexist = { message: 'User already registered' };
const loginErr = { message: 'Invalid fields' };
const errempytpass = { message: '"password" is not allowed to be empty' };
const errempytemail = { message: '"email" is not allowed to be empty' };

const regxp = /(\w)(.+?)(@)(\w)(.+?)(.\w+$)/;

const validEmail = (req, res, next) => {
if (!req.body.email) { return res.status(cd).json(errNoemail); }  
const { email } = req.body;
if (!regxp.test(email)) { return res.status(cd).json(errLogin); }
next();
};

const registeredEmail = async (req, res, next) => {
  const fromDB = await User.findOne({ where: { email: req.body.email } });
  if (!fromDB) { next(); return; }
  const { dataValues } = Object.assign(fromDB);
  if (dataValues.email === req.body.email) {
    return res.status(cdix).json(errdexist); 
  }
  next();
};

const validPassword = (req, res, next) => {
if (!req.body.password) { return res.status(cd).json(errNopass); } 
if (req.body.password.length < 6) { return res.status(cd).json(errPass); }
if (req.body.displayName.length < 8) { return res.status(cd).json(errName); }
next();
};

const tokenGenerate = (body) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign(body, secret, jwtConfig);
  return { token };
};

const validLogin = async (req, res, next) => {
  if (req.body.password === undefined) { return res.status(cd).json(errNopass); }  
  if (req.body.email === undefined) { return res.status(cd).json(errNoemail); }
  if (req.body.password === '') { return res.status(cd).json(errempytpass); }  
  if (req.body.email === '') { return res.status(cd).json(errempytemail); }

  next();
  };

const findUserLogin = async (req, res, next) => {
  const fromDB = await User.findOne({
    where: {
      [Op.and]: [{ email: req.body.email }, { password: req.body.password }] }, 
  }); 
  
  if (!fromDB) { return res.status(cd).json(loginErr); }
  const { dataValues } = Object.assign(fromDB);
  if (dataValues.email !== req.body.email && req.body.password !== dataValues.password) {
    return res.status(cd).json(loginErr); 
  }
  next();
};  

module.exports = {

  validEmail,
  registeredEmail,
  validPassword,
  tokenGenerate,
  validLogin,
  findUserLogin,

};
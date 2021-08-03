const userServices = require('../services/userServices');
const statusCode = require('../helpersFunctions/getHttpStatusCode');

const createUser = async (req, res, next) => {
  // const { } = req.body;
  console.log('body ', req.body);
  try {
    const newUser = await userServices.createUser(req.body);
    return res.status(statusCode.created).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createUser };

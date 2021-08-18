const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/userService');

const createUser = async (req, res, next) => {
 console.log('[USER CONTROLLER] : CHAMOU O MÉTODO CRIAR UM USER');
   try {
      const { displayName, email, password, image } = req.body;
      const result = await UserService.createUser(displayName, email, password, image);
        return res.status(StatusCodes.CREATED).json({ result });
   } catch (err) {
    console.log(`[USER CONTROLLER] : buscar => ${err}`);
    return next(err);
   }
};
  
  // const userLogin = async (req, res) => {
  //   const { email, password } = req.body;
  
  //   const token = await UserService.userLogin(email, password);
  
  //   return res.status(200).json({ token });
  // };
  
  // const getAllUser = async (_req, res) => {
  //   const users = await UserService.getAllUser();
  
  //   return res.status(200).json(users);
  // };
  
  // const getById = async (req, res) => {
  //   const { id } = req.params;
  //   const user = await UserService.getById(id);
  
  //   return res.status(200).json(user);
  // };
  
  module.exports = {
    createUser,
    // userLogin,
    // getAllUser,
    // getById,
    
  }; 
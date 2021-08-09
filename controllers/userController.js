const { Users } = require('../models');

const createUser = async (req, res) => {
 console.log('[USER CONTROLLER] : CHAMOU O MÉTODO CRIAR UM USER');
   
  const { displayName, email, password, image } = req.body;
    const result = await Users.create(displayName, email, password, image);
    console.log(result);
      return res.status(201).json({ result });
};
  
/*  const userLogin = rescue(async (req, res) => {
    const { email, password } = req.body;
  
    const token = await UserService.userLogin(email, password);
  
    return res.status(200).json({ token });
  });
  
  const getAllUser = rescue(async (_req, res) => {
    const users = await UserService.getAllUser();
  
    return res.status(200).json(users);
  });
  
  const getById = rescue(async (req, res) => {
    const { id } = req.params;
    const user = await UserService.getById(id);
  
    return res.status(200).json(user);
  });
  */
  module.exports = {
    createUser,
    
  }; 
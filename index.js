const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const jwtValidation = require('./middleware/jwt');

const app = express();
app.use(bodyParser.json());

app.post('/user', userController.createUser);
app.post('/login', userController.newLogin);
app.get('/user', jwtValidation, userController.findUsers);
app.get('/user/:id', jwtValidation, userController.findUser);
app.post('/categories', jwtValidation, categoryController.createCat);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

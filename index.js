const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userValidation = require('./middlewares/validateUser');
const loginValidation = require('./middlewares/validateLogin');
const tokenValidation = require('./middlewares/validateToken');
const categoryValidation = require('./middlewares/validateCategory');
const usersController = require('./controllers/usersController');
const categoriesController = require('./controllers/categoriesController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/user', userValidation, usersController.createUser);
app.post('/login', loginValidation, usersController.loginUser);
app.get('/user/:id', tokenValidation, usersController.getUsers);
app.get('/user', tokenValidation, usersController.getUsers);

app.post('/categories', tokenValidation, categoryValidation, categoriesController.createCategory);
app.get('/categories', tokenValidation, categoriesController.getCategories);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

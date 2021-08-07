const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userValidation = require('./middlewares/validateUser');
const loginValidation = require('./middlewares/validateLogin');
const usersController = require('./controllers/usersController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/user', userValidation, usersController.createUser);
app.post('/login', loginValidation, usersController.loginUser);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

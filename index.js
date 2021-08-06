const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
const usersControllers = require('./controllers/usersControllers');

const app = express();

app.use(bodyParser.json());

app.post('/user', usersControllers.createUsers);
app.post('/login', usersControllers.login);

app.get('/user', usersControllers.getAllUsers);
app.get('/user/:id', usersControllers.getUserById);

app.use(errorMiddleware.errorMiddleware);
// não remova esse endpoint, e para o avaliador funcionar
app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.get('/', (request, response) => {
  response.send();
});

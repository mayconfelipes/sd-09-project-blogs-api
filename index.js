const express = require('express');
const User = require('./controllers/userController');
const validateJWT = require('./middlewares/validateJWT');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', User.addUser);
app.get('/user', validateJWT, User.getAllUsers);
app.post('/login', User.login);
const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

require('dotenv/config');

const CreateUserController = require('./controllers/CreateUserController');
const LoginController = require('./controllers/LoginController');
const ErrorsUser = require('./middlewares/ErrorsUser');
const ErrorsLogin = require('./middlewares/ErrosLogin');
const ResponseErrors = require('./middlewares/ResponseErrors');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', rescue(CreateUserController));
app.use(ErrorsUser);
app.post('/login', rescue(LoginController));
app.use(ErrorsLogin);
app.use(ResponseErrors);

app.listen(PORT, () => console.log(`SERVER ONLINE IN ${PORT}!`));

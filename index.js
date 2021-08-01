const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

require('dotenv/config');

const CreateUserController = require('./controllers/CreateUserController');
const CreateErrorsUser = require('./middlewares/CreateErrorsUser');
const ResponseErrors = require('./middlewares/ResponseErrors');

const { PORT } = process.env || 3000;

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', rescue(CreateUserController));
app.use(CreateErrorsUser);
app.use(ResponseErrors);

app.listen(PORT, () => console.log(`SERVER ONLINE IN ${PORT}!`));

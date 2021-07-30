const express = require('express');
const bodyParser = require('body-parser');
const { userController, categoryController } = require('./controllers');
const errors = require('./middlewares/errors');

const app = express();

app.use(bodyParser.json());

app.use('/', userController);
app.use('/', categoryController);

app.use(errors);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

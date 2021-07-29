const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');
const user = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Requisito 01
app.post('/user', user.create);

app.use(middlewares.error);

app.listen(3000, () => console.log('ouvindo porta 3000!')); 

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

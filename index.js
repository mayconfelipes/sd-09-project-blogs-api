require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log('ouvindo porta 3000!'));

app.use('/user', controllers.user);
app.use('/login', controllers.login);
app.use('/categories', controllers.categories);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

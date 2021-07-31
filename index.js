require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const { error } = require('./middlewares');

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(error);

app.listen(PORT || 3000, () => console.log(`ouvindo porta ${PORT || 3000}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

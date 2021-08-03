require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const middleware = require('./middlewares');

const { PORT } = process.env || 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(router);
app.use(middleware.error);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}`));
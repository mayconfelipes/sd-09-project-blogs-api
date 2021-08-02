const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes/routes');
const error = require('./src/middlewares/Error');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use(router);
app.use(error);

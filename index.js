const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const express = require('express');
const bodyParser = require('body-parser');
const error = require('./middelwares/error');
require('dotenv').config();

const user = require('./controllers/routes/user');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Girando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', user);
app.use(error);

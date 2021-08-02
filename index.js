const express = require('express');
const bodyParser = require('body-parser');
const error = require('./middelwares/error');
require('dotenv').config();

const route = require('./controllers/routes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Girando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', route.user);
app.use('/login', route.login);
app.use('/categories', route.categories);
app.use(error);

// Iniciando projeto!
const express = require('express');
const bodyParser = require('body-parser');
const errorHandling = require('./middleware/error');

const { userRoute } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorHandling);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

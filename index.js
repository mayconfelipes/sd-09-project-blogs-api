require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser').json();
const errors = require('./middlewares/errors');

const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');

app.use(bodyParser);

app.use('/user', userRoutes);

app.use(errors);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

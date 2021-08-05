const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('./user', UserRouter);
app.use('./login', UserRouter);
app.use('./categories', UserRouter);
app.use('./post', UserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
